@echo off
chcp 65001 >nul

echo == StudyAssist local quick start ==
where docker >nul 2>nul
if %errorlevel% neq 0 (
  echo Docker не найден. Установите Docker Desktop и повторите.
  exit /b 1
)

docker compose up --build
