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

Place the trained checkpoint at the repository root as `best_model.pth`, then start the stack. Docker mounts it read-only at `/models/best_model.pth`. The backend loads it as a strict VCA-Net segmentation checkpoint, resizes input to `256x256`, prepares the required two-channel tensor, and returns a lesion mask from `POST /api/analysis`.

The endpoint accepts an image multipart field named `file`. It rejects unsupported, unreadable, non-grayscale, and non-CT-like images with a clear validation error. This checkpoint produces lesion segmentation only; it does not contain a two-class ischemic/hemorrhagic classification head.

Model settings can be changed with `MODEL_PATH`, `MODEL_INPUT_SIZE`, and `MODEL_THRESHOLD` in `.env`.

## Project layout

- `frontend/`: Next.js App Router application
- `backend/`: FastAPI application, SQLAlchemy, and Alembic migrations
- `docs/`: architecture and API notes
- `docker-compose.yml`: local development services
