# Deploying Ummat Al-Quran on a Linux server

A complete, copy‑paste walkthrough for putting this Next.js app live on a fresh Linux
server — from installing packages to HTTPS.

> **Heads up:** the app is now configured for **static export** (`output: 'export'` in
> `next.config.mjs`). The recommended, cheapest way to deploy is therefore a static/CDN host —
> see **`DEPLOY-STATIC.md`** (Cloudflare Pages, free). This Linux/VPS guide still works if you
> want a self‑hosted Node server, but first **remove the `output: 'export'` line** from
> `next.config.mjs` so `next start` can run.

Two paths are covered:

- **Path A — Node + Nginx (recommended for a VPS).** Run `next start` behind Nginx with a
  process manager (PM2 or systemd) and free HTTPS via Let's Encrypt.
- **Path B — Docker.** Build one image and run it (optionally behind the same Nginx).

**Assumptions:** Ubuntu 22.04 / 24.04 LTS on a fresh VPS, a sudo‑capable user, and (for HTTPS)
a domain whose DNS `A` record points at the server's IP. Notes for Debian/RHEL are inline.
The app needs **Node 18.17+** (Node 20 LTS used here), listens on **port 3000**, and requires
**no database or secret env vars**.

> **Important — fonts at build time:** the UI loads Arabic fonts through `next/font`, which
> downloads them from Google Fonts **during `npm run build`**. The build machine must be able to
> reach `fonts.googleapis.com` and `fonts.gstatic.com`. On a locked‑down server, either allow
> that egress for the build, or build locally and copy the `.next` folder up (see Troubleshooting).

---

## Path A — Node + Nginx

### 1. Update the system and install base packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ca-certificates ufw build-essential
```

*(Debian: identical. RHEL/Alma/Rocky: `sudo dnf upgrade -y && sudo dnf install -y curl git ufw gcc-c++ make`.)*

### 2. Install Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v      # v20.x
npm -v
```

*(RHEL family: `curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash - && sudo dnf install -y nodejs`.
 Prefer nvm? `nvm install 20 && nvm use 20` — but for services, a system‑wide install is simpler.)*

### 3. Open the firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### 4. (Optional) create a deploy user and app directory

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo mkdir -p /var/www/ummat-al-quran
sudo chown -R deploy:deploy /var/www/ummat-al-quran
```

Log in as `deploy` (or your own user) for the rest. Adjust paths if you use a different location.

### 5. Get the code onto the server

**Option 1 — Git:**

```bash
cd /var/www
git clone <YOUR_REPO_URL> ummat-al-quran
cd ummat-al-quran
```

**Option 2 — copy from your machine** (run locally, from the project's parent folder):

```bash
rsync -avz --exclude node_modules --exclude .next \
  ./ummat-al-quran/  deploy@YOUR_SERVER_IP:/var/www/ummat-al-quran/
```

### 6. Install dependencies and build

```bash
cd /var/www/ummat-al-quran
npm install
npm run build
```

> Low‑RAM servers (≤1 GB) can be killed during build. Add swap first:
>
> ```bash
> sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
> sudo mkswap /swapfile && sudo swapon /swapfile
> echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
> ```

Quick smoke test (Ctrl‑C to stop):

```bash
npm start          # then browse http://YOUR_SERVER_IP:3000
```

### 7. Keep it running — pick ONE

**Option A · PM2** (simple, great logs):

```bash
sudo npm install -g pm2
pm2 start ecosystem.config.js     # ships in this repo
pm2 save
pm2 startup                       # run the command it prints, to start on boot
pm2 status
pm2 logs ummat-al-quran
```

**Option B · systemd** (no extra dependency):

```bash
sudo cp deploy/ummat-al-quran.service /etc/systemd/system/
# edit User= and WorkingDirectory= if you changed them
sudo systemctl daemon-reload
sudo systemctl enable --now ummat-al-quran
sudo systemctl status ummat-al-quran
```

Either way the app now runs on `127.0.0.1:3000`.

### 8. Put Nginx in front

```bash
sudo apt install -y nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/ummat-al-quran
sudo nano /etc/nginx/sites-available/ummat-al-quran   # set your real server_name
sudo ln -s /etc/nginx/sites-available/ummat-al-quran /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default            # optional: drop the welcome page
sudo nginx -t
sudo systemctl reload nginx
```

The site is now reachable over **http://your‑domain** on port 80.

### 9. Enable HTTPS (Let's Encrypt)

```bash
sudo snap install core && sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot edits the Nginx config to add TLS and sets up **auto‑renewal** (test with
`sudo certbot renew --dry-run`). Your site is now live on **https://**.

### 10. Redeploy after changes

```bash
cd /var/www/ummat-al-quran
git pull                 # or rsync again
npm install
npm run build
pm2 reload ummat-al-quran            # PM2
# sudo systemctl restart ummat-al-quran   # systemd
```

---

## Path B — Docker

A `Dockerfile`, `.dockerignore`, and `docker-compose.yml` ship in this repo.

### 1. Install Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER      # log out/in so the group applies
```

### 2. Build and run

```bash
cd /var/www/ummat-al-quran
docker compose up -d --build        # builds the image, runs on :3000
docker compose logs -f
```

Or without compose:

```bash
docker build -t ummat-al-quran .
docker run -d --name ummat-al-quran -p 3000:3000 --restart unless-stopped ummat-al-quran
```

### 3. Front it with Nginx + HTTPS

The container publishes `3000`, so steps **8–9** of Path A apply unchanged (host Nginx →
`127.0.0.1:3000`). Update with `docker compose up -d --build`.

> The Docker **build** stage also fetches Google Fonts — build where outbound HTTPS is allowed
> (your CI or the server), then `docker push` / `docker save` the image to hosts that are offline.

---

## Troubleshooting

- **502 Bad Gateway** — the app isn't running or isn't on 3000. Check `pm2 status` /
  `systemctl status ummat-al-quran` / `docker ps`, and `curl -I http://127.0.0.1:3000`.
- **Build killed / out of memory** — add swap (step 6) or build on a bigger machine.
- **Build fails fetching fonts** — the server can't reach Google Fonts. Build locally, then copy
  the result up and just run it:
  ```bash
  rsync -avz ./ummat-al-quran/  deploy@SERVER:/var/www/ummat-al-quran/   # includes .next + node_modules
  # on the server:
  npm start        # or pm2 start ecosystem.config.js
  ```
  (Alternatively, replace the three `next/font` imports in `src/app/layout.tsx` with local
  `next/font/local` files so no network is needed at build time.)
- **`EADDRINUSE: 3000`** — another process holds the port: `sudo lsof -i :3000` then stop it, or
  change `PORT` (env + Nginx `proxy_pass` + `-p` flag) consistently.
- **Port 3000 exposed publicly** — keep UFW closed to 3000; only 80/443 should be open. Nginx
  reaches the app over localhost.
- **Permission denied on files** — `sudo chown -R deploy:deploy /var/www/ummat-al-quran`.
- **Certbot can't verify** — DNS `A` record must point at the server and port 80 must be open
  before running certbot.

## Deploy checklist

1. Packages + Node 20 installed · 2. UFW allows 22/80/443 · 3. Code on server ·
4. `npm install && npm run build` succeeds · 5. PM2/systemd running the app on 3000 ·
6. Nginx proxying your domain · 7. Certbot HTTPS + auto‑renew · 8. Redeploy command known.
