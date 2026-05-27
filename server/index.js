import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './db.js';
import { r2Enabled, r2PutObject } from './r2.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsDir));

const allowedMime = ['image/jpeg','image/png','image/webp','image/gif','image/avif'];
const makeKey = (originalName) => {
  const ext = path.extname(originalName).toLowerCase() || '.jpg';
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
};

const upload = multer({
  storage: r2Enabled
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: uploadsDir,
        filename: (_req, file, cb) => cb(null, makeKey(file.originalname)),
      }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMime.includes(file.mimetype)) return cb(new Error('Only image files are allowed'));
    cb(null, true);
  },
});

console.log(r2Enabled ? '📦 Image storage: Cloudflare R2' : '💾 Image storage: local disk (server/uploads/)');

const toCar = (r) => ({
  id: r.id,
  brand: r.brand,
  model: r.model,
  year: r.year,
  price: Number(r.price),
  mileage: r.mileage,
  color: r.color,
  engine: r.engine,
  power: r.power,
  transmission: r.transmission,
  top_speed: r.top_speed,
  accel: r.accel,
  status: r.status,
  featured: r.featured,
  badge: r.badge ?? '',
  emoji: r.emoji ?? '🚗',
  desc: r.description ?? '',
  images: r.images ?? [],
});

const carCols = ['brand','model','year','price','mileage','color','engine','power','transmission','top_speed','accel','status','featured','badge','emoji','description','images'];
const carValues = (c) => [
  c.brand, c.model,
  parseInt(c.year) || new Date().getFullYear(),
  parseInt(c.price) || 0,
  parseInt(c.mileage) || 0,
  c.color || null, c.engine || null, c.power || null, c.transmission || null,
  c.top_speed || null, c.accel || null,
  c.status || 'active',
  !!c.featured,
  c.badge || null,
  c.emoji || '🚗',
  c.desc ?? c.description ?? null,
  Array.isArray(c.images) ? c.images : [],
];

app.get('/api/cars', async (_req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cars ORDER BY featured DESC, id ASC');
    res.json(rows.map(toCar));
  } catch (err) { next(err); }
});

app.get('/api/cars/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(toCar(rows[0]));
  } catch (err) { next(err); }
});

app.post('/api/cars', async (req, res, next) => {
  try {
    if (!req.body?.brand || !req.body?.model) return res.status(400).json({ error: 'brand and model are required' });
    const placeholders = carCols.map((_, i) => `$${i + 1}`).join(',');
    const { rows } = await pool.query(
      `INSERT INTO cars (${carCols.join(',')}) VALUES (${placeholders}) RETURNING *`,
      carValues(req.body)
    );
    res.status(201).json(toCar(rows[0]));
  } catch (err) { next(err); }
});

app.put('/api/cars/:id', async (req, res, next) => {
  try {
    const setClause = carCols.map((c, i) => `${c} = $${i + 1}`).join(', ');
    const { rows } = await pool.query(
      `UPDATE cars SET ${setClause}, updated_at = NOW() WHERE id = $${carCols.length + 1} RETURNING *`,
      [...carValues(req.body), req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(toCar(rows[0]));
  } catch (err) { next(err); }
});

app.delete('/api/cars/:id', async (req, res, next) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM cars WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) { next(err); }
});

app.post('/api/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded (field name must be "image")' });
    if (r2Enabled) {
      const key = makeKey(req.file.originalname);
      const url = await r2PutObject({ key, body: req.file.buffer, contentType: req.file.mimetype });
      return res.status(201).json({ url });
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  } catch (err) { next(err); }
});

// ─── AUTH ────────────────────────────────────────────────────────────────────
const toUser = (r) => ({ id: r.id, name: r.name, email: r.email, isAdmin: r.is_admin });

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const { rows } = await pool.query('SELECT id, name, email, password_hash, is_admin FROM users WHERE email = LOWER($1)', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid email or password' });
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
    res.json(toUser(rows[0]));
  } catch (err) { next(err); }
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' });
    if (password.length < 8)         return res.status(400).json({ error: 'Password must be at least 8 characters' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Invalid email address' });
    const hash = await bcrypt.hash(password, 12);
    try {
      const { rows } = await pool.query(
        `INSERT INTO users (name, email, password_hash, is_admin) VALUES ($1, LOWER($2), $3, FALSE) RETURNING id, name, email, is_admin`,
        [name, email, hash]
      );
      res.status(201).json(toUser(rows[0]));
    } catch (err) {
      if (err.code === '23505') return res.status(409).json({ error: 'That email is already registered' });
      throw err;
    }
  } catch (err) { next(err); }
});

// ─── Serve the React build (production) ─────────────────────────────────────
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  console.log(`🌐 Serving React build from ${distDir}`);
  app.use(express.static(distDir));
  // SPA fallback — any non-API GET returns index.html so client-side routing works.
  app.get(/^\/(?!api|uploads).*/, (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal error' });
});

const port = process.env.PORT || process.env.API_PORT || 4000;
app.listen(port, () => console.log(`HengHuy API listening on http://localhost:${port}`));
