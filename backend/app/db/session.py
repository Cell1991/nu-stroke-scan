from collections.abc import Generator
import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

logger = logging.getLogger(__name__)

try:
    engine = create_engine(settings.database_url, pool_pre_ping=True)
except Exception as exc:
    logger.warning("Failed to connect to primary DB (%s), falling back to SQLite: %s", settings.database_url, exc)
    engine = create_engine("sqlite:///./stroke_scan.db", connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db() -> Generator[Session, None, None]:
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()

