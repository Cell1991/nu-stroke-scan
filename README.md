# Nu Stroke Scan

A Docker-first 3-tier application scaffold with a Next.js frontend, FastAPI backend, and PostgreSQL 16 database.

## Quick start

```bash
cp .env.example .env
docker compose up --build
```

Open:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

The backend uses SQLAlchemy 2.x and Alembic. PostgreSQL data is stored in the named `postgres_data` Docker volume and is not committed to Git.

## Real model inference

Three trained checkpoints from the sibling thesis folders are wired in via read-only Docker bind mounts (see `docker-compose.yml`) -- no manual copying needed as long as `results/`, `vcanet_ct/`, `dlka_ct/2D/`, and `patcher_ct/` exist next to this repo:

- `vcanet` -- VCA-Net (`vcanet_ct/model.py`), checkpoint from `results/vcanet_results/checkpoints/best.pth`.
- `dlka` -- Deformable LKA / MaxViT (`dlka_ct/2D/networks/MaxViT_deform_LKA.py`), checkpoint from `results/dlka_results/checkpoints/best.pth`.
- `patcher` -- Patcher (SegFormer-style, mmseg + PyTorch Lightning, `patcher_ct/`), checkpoint from `results/patcher_results_new/checkpoints/best.ckpt`. This model needs `torch<2.0` and `mmcv-full`, which conflicts with the main backend's `torch==2.5.1+cpu`, so it runs as its own FastAPI microservice (`patcher_ct/infer_server.py`, its own container) that the backend proxies to over the internal Docker network.

All three share the same 224x224 grayscale preprocessing. `POST /api/analysis` accepts a multipart `file` field, a `model` field (`vcanet` | `dlka` | `patcher`, default `vcanet`), and a `threshold` field (0-1). `GET /api/analysis/models` lists the available models for the frontend's model picker.

The endpoint rejects unsupported, unreadable, non-grayscale, and non-CT-like images with a clear validation error. These checkpoints produce lesion segmentation only; none contains a two-class ischemic/hemorrhagic classification head.

Checkpoint paths and the Patcher service URL can be overridden with `VCANET_CHECKPOINT`, `DLKA_CHECKPOINT`, `PATCHER_SERVICE_URL`, `PATCHER_CHECKPOINT`, and `MODEL_THRESHOLD` in `.env`.

## Project layout

- `frontend/`: Next.js App Router application
- `backend/`: FastAPI application, SQLAlchemy, and Alembic migrations
- `docs/`: architecture and API notes
- `docker-compose.yml`: local development services
