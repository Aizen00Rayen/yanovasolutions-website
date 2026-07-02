import express from 'express';
import db, { slugify } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function ensureUniqueSlug(base, ignoreId = null) {
  let slug = base || 'post';
  let n = 1;
  // Append -2, -3 ... until the slug is unique (excluding the row being edited).
  while (true) {
    const row = db.prepare(`SELECT id FROM blogs WHERE slug = ?`).get(slug);
    if (!row || row.id === ignoreId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

// GET /api/blogs — public: published posts only (list view, no full content).
router.get('/', (req, res) => {
  const rows = db
    .prepare(
      `SELECT id, slug, title_en, title_fr, excerpt_en, excerpt_fr, cover_image, tags,
              created_at, updated_at
       FROM blogs WHERE published = 1 ORDER BY created_at DESC, id DESC`
    )
    .all();
  res.json({ blogs: rows });
});

// GET /api/blogs/all — admin: every post including drafts.
router.get('/all', requireAuth, (req, res) => {
  const rows = db.prepare(`SELECT * FROM blogs ORDER BY created_at DESC, id DESC`).all();
  res.json({ blogs: rows });
});

// GET /api/blogs/:slug — public: single published post by slug.
router.get('/:slug', (req, res) => {
  const row = db.prepare(`SELECT * FROM blogs WHERE slug = ?`).get(req.params.slug);
  if (!row || row.published !== 1) return res.status(404).json({ error: 'Post not found.' });
  res.json({ blog: row });
});

// GET /api/blogs/id/:id — admin: fetch a single post by id (for editing).
router.get('/id/:id', requireAuth, (req, res) => {
  const row = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Post not found.' });
  res.json({ blog: row });
});

function readPayload(body) {
  const b = body || {};
  return {
    title_en: (b.title_en || '').trim(),
    title_fr: (b.title_fr || '').trim(),
    excerpt_en: (b.excerpt_en || '').trim(),
    excerpt_fr: (b.excerpt_fr || '').trim(),
    content_en: (b.content_en || '').trim(),
    content_fr: (b.content_fr || '').trim(),
    cover_image: (b.cover_image || '').trim() || null,
    tags: (b.tags || '').trim(),
    published: b.published === false || b.published === 0 ? 0 : 1,
    slug: (b.slug || '').trim(),
  };
}

// POST /api/blogs — admin: create.
router.post('/', requireAuth, (req, res) => {
  const p = readPayload(req.body);
  if (!p.title_en || !p.title_fr || !p.content_en || !p.content_fr) {
    return res
      .status(400)
      .json({ error: 'Titles and content are required in both English and French.' });
  }
  const slug = ensureUniqueSlug(slugify(p.slug || p.title_en));

  const info = db
    .prepare(
      `INSERT INTO blogs
        (slug, title_en, title_fr, excerpt_en, excerpt_fr, content_en, content_fr,
         cover_image, tags, published)
       VALUES (@slug, @title_en, @title_fr, @excerpt_en, @excerpt_fr, @content_en,
               @content_fr, @cover_image, @tags, @published)`
    )
    .run({ ...p, slug });

  const blog = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(info.lastInsertRowid);
  res.status(201).json({ blog });
});

// PUT /api/blogs/:id — admin: update.
router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Post not found.' });

  const p = readPayload(req.body);
  if (!p.title_en || !p.title_fr || !p.content_en || !p.content_fr) {
    return res
      .status(400)
      .json({ error: 'Titles and content are required in both English and French.' });
  }
  const slug = ensureUniqueSlug(
    slugify(p.slug || p.title_en),
    Number(req.params.id)
  );

  db.prepare(
    `UPDATE blogs SET
       slug=@slug, title_en=@title_en, title_fr=@title_fr,
       excerpt_en=@excerpt_en, excerpt_fr=@excerpt_fr,
       content_en=@content_en, content_fr=@content_fr,
       cover_image=@cover_image, tags=@tags, published=@published,
       updated_at=datetime('now')
     WHERE id=@id`
  ).run({ ...p, slug, id: Number(req.params.id) });

  const blog = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(req.params.id);
  res.json({ blog });
});

// DELETE /api/blogs/:id — admin.
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare(`DELETE FROM blogs WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found.' });
  res.json({ ok: true });
});

export default router;
