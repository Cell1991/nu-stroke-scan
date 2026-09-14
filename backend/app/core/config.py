from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Nu Stroke Scan API"
    database_url: str = "postgresql+psycopg://postgres:postgres@database:5432/nu_stroke_scan"
    cors_origins: str = "http://localhost:3000"
    model_path: str = "/models/best_model.pth"
    model_input_size: int = 256
    model_threshold: float = 0.5

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
