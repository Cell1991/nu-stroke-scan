@echo off
echo ===================================================
echo   NU STROKE SCAN - NGROK TUNNEL LAUNCHER
echo ===================================================
echo.
echo [1/3] Starting FastAPI Backend on port 8000...
start "NU-Stroke-Backend" cmd /k "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000"

echo [2/3] Starting Next.js Frontend on port 3000...
start "NU-Stroke-Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Starting ngrok Tunnel for Frontend (Port 3000)...
echo.
echo NOTE: Next.js automatically proxies all /api/ requests to the backend!
echo You only need this single ngrok tunnel.
echo.
ngrok http 3000
pause
