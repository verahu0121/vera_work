import { Pool, type PoolConfig } from 'pg'

function buildPoolConfig(connectionString: string): PoolConfig {
  const parsed = new URL(connectionString)
  const sslMode = parsed.searchParams.get('sslmode')

  return {
    connectionString,
    ssl: sslMode === 'require' ? { rejectUnauthorized: false } : undefined,
  }
}

export function createPostgresPool(connectionString: string) {
  return new Pool(buildPoolConfig(connectionString))
}

export async function ensurePostgresSchema(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_auth_settings (
      id TEXT PRIMARY KEY,
      platform_welcome_text TEXT NOT NULL,
      platform_password_hash TEXT NOT NULL,
      admin_welcome_text TEXT NOT NULL,
      admin_password_hash TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_projects (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      sort_order INTEGER NOT NULL,
      title TEXT NOT NULL,
      english_title TEXT NOT NULL,
      date_range TEXT NOT NULL,
      description TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      hero_eyebrow_text TEXT,
      hero_background_color TEXT,
      hero_eyebrow_color TEXT,
      hero_title_text TEXT,
      hero_title_color TEXT,
      hero_subtitle_text TEXT,
      hero_subtitle_color TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_project_sections (
      id BIGSERIAL PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
      stable_id TEXT,
      section_key TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      sort_order INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (project_id, section_key),
      UNIQUE (project_id, sort_order)
    )
  `)

  await pool.query(`
    ALTER TABLE portfolio_project_sections
    ADD COLUMN IF NOT EXISTS stable_id TEXT
  `)

  await pool.query(`
    UPDATE portfolio_project_sections
    SET stable_id = section_key
    WHERE stable_id IS NULL OR stable_id = ''
  `)

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS portfolio_project_sections_project_stable_id_key
    ON portfolio_project_sections (project_id, stable_id)
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_section_images (
      id TEXT PRIMARY KEY,
      section_id BIGINT NOT NULL REFERENCES portfolio_project_sections(id) ON DELETE CASCADE,
      object_key TEXT,
      src TEXT NOT NULL,
      alt TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (section_id, sort_order)
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS resume_content (
      id TEXT PRIMARY KEY,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}
