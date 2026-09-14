# Database Overview

Database access is implemented with SQLAlchemy 2.x and the PostgreSQL `psycopg` driver. Schema changes belong in Alembic migrations under `backend/migrations/versions/`.

Run migrations inside the backend container with:

```bash
docker compose exec backend alembic upgrade head
```
