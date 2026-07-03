import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { safeUrl } from '../utils.js';

const router = express.Router();

function readPayload(body) {
  const b = body || {};
  return {
    name: (b.name || '').trim().slice(0, 120),
    logo_url: safeUrl(b.logo_url) || null,
    website_url: safeUrl(b.website_url) || null,
    sort_order: Number.isFinite(Number(b.sort_order)) ? Number(b.sort_order) : 0,
  };
}

// GET /api/partners — public: ordered list.
router.get('/', (req, res) => {
  const rows = db
    .prepare(`SELECT * FROM partners ORDER BY sort_order ASC, id ASC`)
    .all();
  res.json({ partners: rows });
});

// POST /api/partners — admin: create.
router.post('/', requireAuth, (req, res) => {
  const p = readPayload(req.body);
  if (!p.name) return res.status(400).json({ error: 'Partner name is required.' });

  const info = db
    .prepare(
      `INSERT INTO partners (name, logo_url, website_url, sort_order)
       VALUES (@name, @logo_url, @website_url, @sort_order)`
    )
    .run(p);
  const partner = db.prepare(`SELECT * FROM partners WHERE id = ?`).get(info.lastInsertRowid);
  res.status(201).json({ partner });
});

// PUT /api/partners/:id — admin: update.
router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare(`SELECT id FROM partners WHERE id = ?`).get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Partner not found.' });

  const p = readPayload(req.body);
  if (!p.name) return res.status(400).json({ error: 'Partner name is required.' });

  db.prepare(
    `UPDATE partners SET name=@name, logo_url=@logo_url, website_url=@website_url,
       sort_order=@sort_order WHERE id=@id`
  ).run({ ...p, id: Number(req.params.id) });
  const partner = db.prepare(`SELECT * FROM partners WHERE id = ?`).get(req.params.id);
  res.json({ partner });
});

// DELETE /api/partners/:id — admin.
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare(`DELETE FROM partners WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Partner not found.' });
  res.json({ ok: true });
});

export default router;
