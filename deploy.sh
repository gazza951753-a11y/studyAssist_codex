#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi
source "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

sudo apt update
sudo apt install -y mysql-server nginx certbot python3-certbot-nginx
sudo npm i -g pm2

npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run build
pm2 start ecosystem.config.js
pm2 save

echo "Далее настройте nginx reverse proxy на 3000 и SSL через certbot."
