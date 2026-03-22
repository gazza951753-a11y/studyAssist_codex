#!/usr/bin/env bash
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

# Обновим .env для docker-local запуска
if ! grep -q "mysql://studyassist:studyassist@mysql:3306/studyassist" .env; then
  sed -i 's|^DATABASE_URL=.*|DATABASE_URL="mysql://studyassist:studyassist@mysql:3306/studyassist"|' .env || true
  sed -i 's|^NEXTAUTH_URL=.*|NEXTAUTH_URL="http://localhost:3000"|' .env || true
fi

npm install
npx prisma generate

# ждём mysql
for i in {1..60}; do
  if npx prisma db push --skip-generate >/dev/null 2>&1; then
    break
  fi
  echo "Waiting for MySQL... ($i/60)"
  sleep 2
done

npx prisma db seed || true
npm run dev -- -H 0.0.0.0 -p 3000
