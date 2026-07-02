# Deploying to Hostinger from GitHub (Node.js hosting)

This app is a single Node process: Express serves the API **and** the pre-built React site
(`dist/` is committed to the repo), so Hostinger only needs to install dependencies and start it —
**no build step required on the server.**

Repo: `https://github.com/Aizen00Rayen/yanovasolutions-website`

> Requirements: a Hostinger plan that includes **Node.js** (Business / Cloud shared hosting or VPS).

---

## 1. Connect the GitHub repo in hPanel

1. In hPanel go to **Advanced → GIT**.
2. **Create a new repository / Deploy**:
   - **Repository:** `https://github.com/Aizen00Rayen/yanovasolutions-website.git`
   - **Branch:** `main`
   - **Directory:** e.g. `yanova` (inside your domain, e.g. `domains/yourdomain.com/yanova`)
3. Deploy — Hostinger clones the repo into that directory.
   (Optional: enable **Auto-Deployment / webhook** so every `git push` re-pulls automatically.)

## 2. Create the Node.js application

Go to **hPanel → Advanced → Node.js → Create application**:

| Field                        | Value                          |
|------------------------------|--------------------------------|
| **Node.js version**          | 18.x or higher                 |
| **Application root**         | the folder from step 1 (`yanova`) |
| **Application URL**          | your domain / subdomain        |
| **Application startup file** | `server/server.js`             |

Create the app.

## 3. Environment variables

In the Node.js app panel, add these environment variables (**do this — the `.env` file is not in the repo**):

```
NODE_ENV=production
ADMIN_USERNAME=admin@yanovasolutions.tech
ADMIN_PASSWORD=adminYanova!2026
JWT_SECRET=<paste a long random string>
JWT_EXPIRES_IN=7d
```

- **Do not** set `PORT` — Hostinger assigns it automatically (the app reads `process.env.PORT`).
- Generate a strong `JWT_SECRET`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```

## 4. Install & start

In the Node.js app panel:

1. Click **Run NPM Install** — this installs dependencies, including the native
   `better-sqlite3` (a prebuilt Linux binary is downloaded automatically; no compiler needed).
2. Click **Restart** (or Start).

Because `dist/` is already in the repo, **there is no build step**. Visit your domain:

- Public site: `https://yourdomain.com/`
- Admin panel: `https://yourdomain.com/admin/login`
  - Username: `admin@yanovasolutions.tech`
  - Password: `adminYanova!2026`

## 5. (Optional) seed starter content

The database starts empty on a fresh server. To insert the starter blog posts and the
Galattica partner, use **Run NPM Script → seed** (or run `npm run seed` in a server terminal).
You can also just create everything from the admin panel.

---

## Updating the site later

1. Make changes locally.
2. **If you changed the frontend**, rebuild so the committed `dist/` is current:
   ```bash
   npm run build
   ```
3. Commit and push:
   ```bash
   git add -A && git commit -m "Update" && git push
   ```
4. In hPanel: pull the latest (GIT → Deploy, or automatic if webhook enabled),
   then **Restart** the Node.js app. Re-run **NPM Install** only if dependencies changed.

## Data & backups

- All data lives in a single SQLite file: **`server/data/yanova.db`** (created automatically on first run, not in git).
- To back up, download that file. To reset, delete it (a fresh empty DB is recreated on restart).

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| Blank page / "frontend has not been built" | `dist/` is missing — run `npm run build`, commit, push, redeploy. |
| 502 / app won't start | Startup file must be `server/server.js`; check logs in the Node.js panel. |
| Can't log in to admin | Verify the `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars are set, then restart. |
| Admin session drops instantly | Ensure `JWT_SECRET` is set and unchanged between restarts. |
| `better-sqlite3` install error | Confirm Node 18+; retry NPM Install; if it persists, contact Hostinger support. |
