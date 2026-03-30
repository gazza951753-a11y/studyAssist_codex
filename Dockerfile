FROM node:20-bookworm

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps || true

COPY . .

RUN chmod +x scripts/dev-entrypoint.sh

EXPOSE 3000
CMD ["bash", "scripts/dev-entrypoint.sh"]
