# Deploying Ummat Al-Quran as a static site

The app is configured for **static export** (`output: 'export'` in `next.config.mjs`), so
`npm run build` produces a self‑contained static site in the **`out/`** folder that any CDN /
static host can serve. No server, no database — the map, search, filters and video players all
run in the visitor's browser.

Recommended host: **Cloudflare Pages** (free, unlimited bandwidth). Netlify, AWS S3+CloudFront,
or any web server work too.

---

## 1. Build it

```bash
npm install
npm run build        # outputs the static site to ./out
npm run preview      # optional: preview ./out locally at http://localhost:3000
```

> The build downloads the Arabic fonts via `next/font`, so the machine running `npm run build`
> needs outbound internet (fonts.googleapis.com / fonts.gstatic.com). With Git‑based hosts this
> happens on their build servers automatically.

---

## 2. Deploy — Cloudflare Pages (recommended)

### Option A · Connect a Git repo (best; auto‑deploys on every push)

1. Push this project to GitHub / GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. **Save and Deploy.** You get a free `*.pages.dev` URL with HTTPS. Every `git push` rebuilds.
5. **Custom domain:** Pages → your project → *Custom domains* → add `example.com`. If the domain's
   DNS is on Cloudflare, TLS is issued automatically.

### Option B · Direct upload with Wrangler (no Git)

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy out --project-name ummat-al-quran
```

### Option C · Drag‑and‑drop

Dashboard → *Create → Pages → Upload assets* → drag the **`out/`** folder in.

---

## 3. Deploy — other hosts

**Netlify** — Build command `npm run build`, Publish directory `out`. Or via CLI:

```bash
npm run build
netlify deploy --prod --dir=out
```

**AWS S3 + CloudFront** (cheap, pay‑per‑use):

```bash
npm run build
aws s3 sync out/ s3://YOUR_BUCKET --delete
# Bucket: enable static website hosting, index=index.html, error=404.html
# Front it with CloudFront for HTTPS + global CDN (trailingSlash makes /map/ -> /map/index.html)
```

**Your own Nginx** (or the VPS from `DEPLOYMENT.md`) — just serve the folder:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/ummat-al-quran/out;
    index index.html;
    location / { try_files $uri $uri/ $uri.html =404; }
    error_page 404 /404.html;
}
```

Then add HTTPS with Certbot exactly as in `DEPLOYMENT.md` step 9.

---

## 4. Where the media lives (keeps it free/cheap)

Static hosting serves your **HTML/CSS/JS and images**. Heavy media is offloaded — nothing needs
a server:

- **Videos** → already YouTube embeds (lazy‑loaded). Set real IDs in `src/data/resources.ts`
  (`MEDIA[].youtubeId`). Cost: $0.
- **Lesson audio + book PDFs** → upload to **Cloudflare R2** (10 GB free, $0 egress) or
  **Backblaze B2**, then paste the public URLs into `src/data/resources.ts`
  (`PODCASTS[].audioUrl`, `BOOKS[].downloadUrl`). No code changes beyond the URLs.
- **Podcast** → host on any podcast service; put its feed URL in `PODCAST_FEED.rssUrl`.

## 5. Redeploy

- **Git hosts (Pages/Netlify):** `git push` — it rebuilds and ships automatically.
- **Wrangler / S3:** re‑run `npm run build` then the `wrangler pages deploy out` / `aws s3 sync`
  command.

## 6. Good to know

- **Clean URLs** are handled by `trailingSlash: true` (each route is a `folder/index.html`).
- **Forms are front‑end only.** The comments, question form, and newsletter don't submit anywhere
  yet. To make them real without leaving static hosting, point them at a form service
  (Formspree, Basin) or a **Cloudflare Pages Function / Worker** (free tier) — no VPS required.
- **Switching back to SSR later?** Remove `output: 'export'` from `next.config.mjs` and follow
  `DEPLOYMENT.md` (Node + Nginx) instead.
```
