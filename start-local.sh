#!/usr/bin/env bash
set -e

echo "== StudyAssist local quick start =="
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker не найден. Установите Docker Desktop и повторите."
  exit 1
fi

docker compose up --build
