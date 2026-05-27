import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://henghuy:henghuy_dev@localhost:5432/henghuy',
});

pool.on('error', (err) => {
  console.error('Unexpected Postgres pool error', err);
});
