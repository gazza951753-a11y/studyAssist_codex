# StudyAssist.ru — быстрый локальный запуск

## Вариант 1 (рекомендуется): ОДНА команда через Docker

### Что нужно
- Установленный Docker Desktop

### Шаги
1. Распакуйте проект.
2. Откройте папку проекта.
3. Запустите:
   - **Windows:** `start-local.bat`
   - **macOS/Linux:** `./start-local.sh`
4. Откройте `http://localhost:3000`

Готово. База MySQL поднимется автоматически, Prisma выполнит `db push` и seed.

---

## Вариант 2: вручную без Docker

### Требования
- Node.js 20+
- MySQL 8

### Шаги
1. `cp .env.example .env`
2. Заполните `.env`
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate deploy` (или `npx prisma db push`)
6. `npx prisma db seed`
7. `npm run dev`

---

## OAuth callback URI для локалки
- Mail.ru: `http://localhost:3000/api/auth/callback/mailru`
- VK: `http://localhost:3000/api/auth/callback/vk`
- Yandex: `http://localhost:3000/api/auth/callback/yandex`

---

## Полезно
- Остановка docker-режима: `docker compose down`
- Полный сброс БД docker-режима: `docker compose down -v`


### Если `start-local.bat` не запускается
Запусти напрямую:
```bat
docker compose up --build
```
