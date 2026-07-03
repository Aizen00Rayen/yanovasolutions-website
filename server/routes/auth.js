import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { JWT_SECRET } from '../middleware/auth.js';

const router = express.Router();

const sanitizeEnvVar = (val) => {
  if (!val) return '';
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  return s.trim();
};

const ADMIN_USERNAME = sanitizeEnvVar(process.env.ADMIN_USERNAME) || 'admin@yanovasolutions.tech';
const ADMIN_PASSWORD = sanitizeEnvVar(process.env.ADMIN_PASSWORD) || 'adminYanova!2026';
const JWT_EXPIRES_IN = sanitizeEnvVar(process.env.JWT_EXPIRES_IN) || '7d';

// Hash the configured password once at startup so we never compare plaintext.
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Throttle brute-force attempts against the login endpoint.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

// POST /api/auth/login
router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const userMatches = username === ADMIN_USERNAME;
  const passMatches = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

  if (!userMatches || !passMatches) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = jwt.sign({ sub: 'admin', username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.json({ token, username });
});

// GET /api/auth/me — used by the panel to confirm a stored token is still valid.
router.get('/me', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ username: payload.username });
  } catch {
    res.status(401).json({ error: 'Invalid token.' });
  }
});

export default router;
