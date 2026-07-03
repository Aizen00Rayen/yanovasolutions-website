import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blogs.js';
import partnerRoutes from './routes/partners.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../dist');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // required for rate-limit behind Hostinger's proxy

// ------------------------------------------------------------------
// Security headers (Helmet)
// CSP is tuned to allow the app's own assets, Google Fonts, inline styles
// (React style attributes / Tailwind), and remote images (blog covers, logos).
// ------------------------------------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(express.json({ limit: '512kb' }));

// In development the Vite dev server (5173) calls the API on 3000 — allow it.
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(express.static(distPath));

// ------------------------------------------------------------------
// API
// ------------------------------------------------------------------
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/partners', partnerRoutes);

// Any unknown /api route returns JSON (not the SPA index).
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Generic error handler — never leak stack traces to clients.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  if (res.headersSent) return;
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Yanova Solutions server listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
