# API Overview

The initial backend exposes:

- `GET /`: service metadata
- `GET /api/health`: service and database connectivity status
- `POST /api/analysis`: upload an image in multipart field `file` plus optional `threshold` (0-1) and receive a 256x256 lesion mask, detection label, confidence, and preprocessing metadata
- `GET /docs`: interactive Swagger documentation
- `GET /redoc`: ReDoc documentation

Feature-specific routes should be added under `backend/app/api/routes/` and mounted from `backend/app/api/router.py`.
