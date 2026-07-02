import express from 'express';
import rateLimit from 'express-rate-limit';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Limit how often a visitor can submit the contact form.
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
});

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v));

// POST /api/contact — public: visitor sends a message.
router.post('/', contactLimiter, (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const stmt = db.prepare(
    `INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`
  );
  const info = stmt.run(
    String(name).slice(0, 120),
    String(email).slice(0, 160),
    subject ? String(subject).slice(0, 200) : null,
    String(message)
  );

  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

// --- Admin-only endpoints below ---

// GET /api/contact — list all messages (newest first).
router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare(`SELECT * FROM messages ORDER BY created_at DESC, id DESC`).all();
  const unread = db.prepare(`SELECT COUNT(*) AS c FROM messages WHERE is_read = 0`).get().c;
  res.json({ messages: rows, unread });
});

// PATCH /api/contact/:id/read — mark read/unread.
router.patch('/:id/read', requireAuth, (req, res) => {
  const isRead = req.body?.is_read ? 1 : 0;
  const info = db.prepare(`UPDATE messages SET is_read = ? WHERE id = ?`).run(isRead, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Message not found.' });
  res.json({ ok: true });
});

// DELETE /api/contact/:id
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare(`DELETE FROM messages WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Message not found.' });
  res.json({ ok: true });
});

export default router;
