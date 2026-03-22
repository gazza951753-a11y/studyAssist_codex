@echo off
setlocal

echo == StudyAssist local quick start ==

where docker >nul 2>nul
if %errorlevel% neq 0 (
  echo Docker CLI not found. Install Docker Desktop and restart terminal.
  pause
  exit /b 1
)

docker compose up --build

endlocal
