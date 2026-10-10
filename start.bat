@echo off
title NU STROKE SCAN - ONE-CLICK LAUNCHER
cls
echo =========================================================
echo    NU STROKE SCAN - ALL-IN-ONE AUTOMATIC LAUNCHER
echo =========================================================
echo.

REM 1. Auto-create .env on fresh clone if missing
if not exist .env (
    echo [*] Fresh machine detected: Creating .env from .env.example...
    copy .env.example .env >nul
)

REM 2. Check and download deep learning model checkpoints
echo [*] Checking model weights in checkpoints/...
python scripts/download_checkpoints.py
if errorlevel 1 (
    echo [!] Warning: Failed to download model weights. Starting anyway...
)
echo.

REM 3. Install frontend dependencies on fresh clone if missing
if not exist "frontend\node_modules" (
    echo [*] Fresh machine detected: Installing frontend npm dependencies...
    cd frontend && npm install && cd ..
    echo.
)

REM 4. Launch AI Backend
echo [*] Launching FastAPI AI Backend (Port 8000)...
start "NU-Stroke-Backend" cmd /k "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000"

REM 5. Launch Frontend
echo [*] Launching Next.js UI Frontend (Port 3000)...
start "NU-Stroke-Frontend" cmd /k "cd frontend && npm run dev"

echo [*] Waiting for local servers to initialize...
timeout /t 3 /nobreak >nul

REM 6. Launch ngrok tunnel if available
echo [*] Starting Public ngrok Tunnel on Port 3000...
echo.
echo =========================================================
echo   Your public ngrok link will appear below:
echo   (Share this link with anyone to access the application)
echo =========================================================
echo.
ngrok http 3000
