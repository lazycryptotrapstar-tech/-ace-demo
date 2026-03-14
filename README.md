# Ace.ai — Ticketing Intelligence Demo

## Stack
- **Frontend**: React + Vite + Tailwind CSS
- **AI Backend**: n8n (self-hosted) via webhook
- **Hosting**: Vercel
- **Tunnel**: Cloudflare (for local n8n)

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your n8n URL
cp .env.example .env.local
# Edit .env.local with your current tunnel URL

# 3. Start dev server
npm run dev
# App runs at http://localhost:5173
```

---

## Deploy to Vercel

### First time
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from the ace-demo folder)
vercel

# Follow the prompts — Vercel auto-detects Vite
```

### Set environment variable on Vercel
```bash
vercel env add VITE_N8N_WEBHOOK_URL
# Paste your stable n8n URL when prompted
# Select: Production, Preview, Development
```

Or go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

### Future deploys
```bash
# Just push to GitHub — Vercel auto-deploys on every push
git push
```

---

## Stable n8n URL (Cloudflare Named Tunnel)

Instead of a random tunnel URL that changes on every restart, set up a permanent one:

```bash
# Install cloudflared
brew install cloudflared   # Mac
# or download from https://github.com/cloudflare/cloudflared/releases

# Login to Cloudflare
cloudflared tunnel login

# Create a named tunnel
cloudflared tunnel create ace-n8n

# Route your domain to it (replace with your domain)
cloudflared tunnel route dns ace-n8n n8n.yourdomain.com

# Run it (put this in a startup script)
cloudflared tunnel run ace-n8n
```

Your n8n URL is then permanently `https://n8n.yourdomain.com` — update `VITE_N8N_WEBHOOK_URL` in Vercel to this and you never touch it again.

---

## n8n CORS Fix

In your n8n webhook node, add this response header so Vercel's domain is allowed:

| Header | Value |
|--------|-------|
| `Access-Control-Allow-Origin` | `*` |
| `Access-Control-Allow-Headers` | `Content-Type` |

---

## Updating the App

```bash
# 1. Edit src/App.jsx
# 2. Test locally
npm run dev

# 3. Push to GitHub → Vercel auto-deploys in ~30 seconds
git add .
git commit -m "your change description"
git push
```

---

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `VITE_N8N_WEBHOOK_URL` | Full URL to your n8n chat webhook |
