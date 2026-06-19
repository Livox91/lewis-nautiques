-- Lewis Nautiques Database Schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Boats table
CREATE TABLE IF NOT EXISTS boats (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(200) NOT NULL,
  series          VARCHAR(100) NOT NULL,
  slug            VARCHAR(200) UNIQUE NOT NULL,
  tagline         VARCHAR(300) NOT NULL,
  description     TEXT NOT NULL,
  length_ft       NUMERIC(6,2) NOT NULL,
  top_speed_kts   NUMERIC(5,1) NOT NULL,
  horsepower      INTEGER NOT NULL,
  range_nm        INTEGER NOT NULL,
  engine_config   VARCHAR(200) NOT NULL,
  category        VARCHAR(50) NOT NULL CHECK (category IN ('performance', 'heritage', 'stealth', 'custom')),
  badge_label     VARCHAR(100) NOT NULL,
  image_url       TEXT NOT NULL,
  gallery_urls    TEXT[] NOT NULL DEFAULT '{}',
  specs           JSONB NOT NULL DEFAULT '{}',
  price_on_request BOOLEAN NOT NULL DEFAULT true,
  featured        BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(254) NOT NULL,
  phone       VARCHAR(20) NOT NULL,
  message     TEXT,
  boat_id     UUID REFERENCES boats(id) ON DELETE SET NULL,
  boat_name   VARCHAR(200),
  status      VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS boats_slug_idx ON boats (slug);
CREATE INDEX IF NOT EXISTS boats_featured_idx ON boats (featured);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries (email);
