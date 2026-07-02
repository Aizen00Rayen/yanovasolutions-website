import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blogs.js';
import partnerRoutes from './routes/partners.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
app.set('trust proxy', 1); // required for rate-limit behind Hostinger's proxy

app.use(express.json({ limit: '1mb' }));

// In development the Vite dev server (5173) calls the API on 3000 — allow it.
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

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

// ------------------------------------------------------------------
// Static SPA (production build)
// ------------------------------------------------------------------
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  // SPA fallback: send index.html for all non-API GET requests.
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res
      .status(200)
      .send(
        '<h1>Yanova Solutions API is running</h1><p>The frontend has not been built yet. Run <code>npm run build</code>.</p>'
      );
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Yanova Solutions server listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
