Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   NU STROKE SCAN - ALL-IN-ONE AUTOMATIC LAUNCHER" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[*] Checking model weights in checkpoints/..." -ForegroundColor Yellow
python scripts/download_checkpoints.py
Write-Host ""

Write-Host "[*] Launching FastAPI AI Backend (Port 8000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn app.main:app --host 0.0.0.0 --port 8000"

Write-Host "[*] Launching Next.js UI Frontend (Port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "[*] Waiting 3 seconds for local servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "[*] Starting Public ngrok Tunnel (Port 3000)..." -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  Share the ngrok Forwarding URL below with others:" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""
ngrok http 3000
