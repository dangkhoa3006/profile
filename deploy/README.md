# VPS Deploy Guide (143.198.88.86)

This project is configured for CI/CD deploy from GitHub Actions to your VPS.

## 1) One-time VPS setup

Run on `143.198.88.86` (Ubuntu):

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
mkdir -p /var/www/profile/releases
```

Copy nginx config:

```bash
sudo cp deploy/nginx-profile.conf /etc/nginx/sites-available/profile
sudo ln -s /etc/nginx/sites-available/profile /etc/nginx/sites-enabled/profile
sudo nginx -t
sudo systemctl reload nginx
```

Issue TLS certificate:

```bash
sudo certbot --nginx -d profile.dngkhoa.site
```

## 2) GitHub Actions secrets

Add repository secrets:

- `VPS_HOST` = `143.198.88.86`
- `VPS_PORT` = `22`
- `VPS_USER` = your ssh user (for example `root` or `ubuntu`)
- `VPS_SSH_KEY` = private key content used by Actions to SSH into VPS
- `VPS_APP_DIR` = deploy path (recommended: `/var/www/profile`)
- `APP_ENV_FILE` = multiline `.env` content for production (optional but recommended)

Example `APP_ENV_FILE`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_RECEIVER_EMAIL=dngkhoa.dev@gmail.com
```

## 3) Deploy flow

On push to `master` or `main`:

1. Install deps
2. Lint + build
3. Create Next standalone bundle
4. Upload to VPS
5. Extract to `/var/www/profile/releases/<timestamp>`
6. Switch symlink `/var/www/profile/current`
7. Restart pm2 process `profile`

## 4) Verify on VPS

```bash
pm2 ls
pm2 logs profile --lines 100
curl -I http://127.0.0.1:3000
```

Then open:

- https://profile.dngkhoa.site
