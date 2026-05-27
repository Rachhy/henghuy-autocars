import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing one of ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD in .env');
  process.exit(1);
}

async function run() {
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await pool.query(
    `INSERT INTO users (name, email, password_hash, is_admin)
     VALUES ($1, LOWER($2), $3, TRUE)
     ON CONFLICT (email) DO UPDATE
       SET name          = EXCLUDED.name,
           password_hash = EXCLUDED.password_hash,
           is_admin      = TRUE`,
    [ADMIN_NAME, ADMIN_EMAIL, hash]
  );
  console.log(`Admin user provisioned: ${ADMIN_EMAIL}`);
  await pool.end();
}

run().catch((err) => {
  console.error('Admin seed failed:', err);
  process.exit(1);
});
