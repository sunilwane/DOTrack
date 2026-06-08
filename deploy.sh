#!/bin/bash

set -euo pipefail

pnpm install
pnpm --filter backend build
pnpm --filter frontend build
sudo cp -r apps/frontend/dist/* /var/www/myapp
pm2 restart myapp-backend
sudo systemctl reload nginx
