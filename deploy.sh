#!/bin/bash

pnpm install
pnpm --filter frontend build
sudo cp -r apps/frontend/dist/* /var/www/myapp
pm2 restart myapp-backend
sudo systemctl reload nginx