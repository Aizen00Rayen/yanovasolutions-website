import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { seedPartners, seedPosts } from './seedData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The SQLite database file lives in server/data/ (created on first run).
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'yanova.db'));
db.pragma('journal_mode = WAL');

// ------------------------------------------------------------------
// Schema
// ------------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL,
    subject    TEXT,
    message    TEXT    NOT NULL,
    is_read    INTEGER NOT NULL DEFAULT 0,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS partners (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    logo_url    TEXT,
    website_url TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        TEXT    NOT NULL UNIQUE,
    title_en    TEXT    NOT NULL,
    title_fr    TEXT    NOT NULL,
    excerpt_en  TEXT,
    excerpt_fr  TEXT,
    content_en  TEXT    NOT NULL,
    content_fr  TEXT    NOT NULL,
    cover_image TEXT,
    tags        TEXT,
    published   INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS meta (
    key   TEXT PRIMARY KEY,
    value TEXT
  );
`);

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);
}

// ------------------------------------------------------------------
// One-time starter seed
// Runs automatically on first boot so a fresh deployment (e.g. Hostinger,
// where the DB file is created empty) shows the starter partner + blog posts.
// Guarded by a meta flag so it never re-adds content the admin later deletes.
// ------------------------------------------------------------------
export function seedInitialData() {
  const done = db.prepare(`SELECT value FROM meta WHERE key = 'initial_seed_done'`).get();
  if (done) return { seeded: false };

  const insertPartner = db.prepare(
    `INSERT INTO partners (name, logo_url, website_url, sort_order) VALUES (@name, @logo_url, @website_url, @sort_order)`
  );
  const insertPost = db.prepare(
    `INSERT INTO blogs (slug, title_en, title_fr, excerpt_en, excerpt_fr, content_en, content_fr, cover_image, tags, published)
     VALUES (@slug, @title_en, @title_fr, @excerpt_en, @excerpt_fr, @content_en, @content_fr, @cover_image, @tags, 1)`
  );

  const run = db.transaction(() => {
    if (db.prepare(`SELECT COUNT(*) AS c FROM partners`).get().c === 0) {
      for (const p of seedPartners) insertPartner.run(p);
    }
    if (db.prepare(`SELECT COUNT(*) AS c FROM blogs`).get().c === 0) {
      for (const post of seedPosts) insertPost.run({ ...post, slug: slugify(post.title_en) });
    }
    db.prepare(`INSERT OR REPLACE INTO meta (key, value) VALUES ('initial_seed_done', '1')`).run();
  });
  run();

  return { seeded: true };
}

// Auto-run on import (server startup).
try {
  seedInitialData();
} catch (err) {
  console.error('Initial seed failed:', err.message);
}

export default db;
