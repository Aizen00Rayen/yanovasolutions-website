import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Resolve the secret used to sign/verify admin tokens.
// SECURITY: never fall back to a hard-coded, publicly-known secret in production —
// that would let anyone forge admin sessions. If JWT_SECRET is missing in
// production we generate a strong ephemeral one (sessions reset on restart) and warn.
function resolveJwtSecret() {
  const fromEnv = (process.env.JWT_SECRET || '').trim();
  const isPlaceholder = !fromEnv || fromEnv === 'replace-with-a-long-random-string';

  if (!isPlaceholder) return fromEnv;

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '⚠  JWT_SECRET is not set. Using a generated ephemeral secret — admin sessions will reset on restart. Set JWT_SECRET as an environment variable for stable, secure sessions.'
    );
    return crypto.randomBytes(48).toString('hex');
  }
  // development convenience only
  return 'dev-only-insecure-secret';
}

const JWT_SECRET = resolveJwtSecret();

// Verifies the Bearer token sent by the admin panel.
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
  }
}

export { JWT_SECRET };
