from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health_check(database: Session = Depends(get_db)) -> HealthResponse:
    database.execute(text("SELECT 1"))
    return HealthResponse(status="ok", database="connected")
