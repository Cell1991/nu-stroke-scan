Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   NU STROKE SCAN - ALL-IN-ONE AUTOMATIC LAUNCHER" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Auto-create .env on fresh clone if missing
if (-not (Test-Path ".env")) {
    Write-Host "[*] Fresh machine detected: Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# 2. Check and download deep learning model checkpoints
Write-Host "[*] Checking model weights in checkpoints/..." -ForegroundColor Yellow
python scripts/download_checkpoints.py
Write-Host ""

# 3. Install frontend dependencies on fresh clone if missing
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "[*] Fresh machine detected: Installing frontend npm dependencies..." -ForegroundColor Yellow
    Push-Location frontend
    npm install
    Pop-Location
    Write-Host ""
}

# 4. Launch AI Backend
Write-Host "[*] Launching FastAPI AI Backend (Port 8000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn app.main:app --host 0.0.0.0 --port 8000"

# 5. Launch Frontend
Write-Host "[*] Launching Next.js UI Frontend (Port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "[*] Waiting 3 seconds for local servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 6. Launch ngrok tunnel
Write-Host "[*] Starting Public ngrok Tunnel (Port 3000)..." -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  Share the ngrok Forwarding URL below with others:" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""
ngrok http 3000
