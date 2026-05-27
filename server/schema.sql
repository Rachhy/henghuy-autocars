CREATE TABLE IF NOT EXISTS cars (
  id           SERIAL PRIMARY KEY,
  brand        TEXT    NOT NULL,
  model        TEXT    NOT NULL,
  year         INTEGER NOT NULL,
  price        BIGINT  NOT NULL,
  mileage      INTEGER NOT NULL DEFAULT 0,
  color        TEXT,
  engine       TEXT,
  power        TEXT,
  transmission TEXT,
  top_speed    TEXT,
  accel        TEXT,
  status       TEXT    NOT NULL DEFAULT 'active',
  featured     BOOLEAN NOT NULL DEFAULT FALSE,
  badge        TEXT,
  emoji        TEXT,
  description  TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cars_status_idx   ON cars(status);
CREATE INDEX IF NOT EXISTS cars_brand_idx    ON cars(brand);
CREATE INDEX IF NOT EXISTS cars_featured_idx ON cars(featured);

ALTER TABLE cars ADD COLUMN IF NOT EXISTS images TEXT[] NOT NULL DEFAULT '{}';

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL UNIQUE,
  password_hash TEXT        NOT NULL,
  is_admin      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
