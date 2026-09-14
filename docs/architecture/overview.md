# Architecture Overview

The project follows a 3-tier client-server architecture:

1. Next.js frontend on port 3000 handles UI, routing, forms, and API calls.
2. FastAPI backend on port 8000 handles validation, business logic, and persistence.
3. PostgreSQL 16 on port 5432 stores relational data.

Inside Docker Compose, the backend connects to PostgreSQL through `database:5432`. Browser requests use the host address `http://localhost:8000`.
