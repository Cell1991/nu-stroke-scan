from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Nu Stroke Scan API"
    database_url: str = "postgresql+psycopg://postgres:postgres@database:5432/nu_stroke_scan"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000,*"
    vcanet_checkpoint: str = "/checkpoints/vcanet_best.pth"
    dlka_checkpoint: str = "/checkpoints/dlka_best.pth"
    patcher_checkpoint: str = "/checkpoints/patcher_best.ckpt"
    classification_checkpoint: str = "/checkpoints/classification_best.pth"
    modality_checkpoint: str = "/checkpoints/modality.pth"
    model_threshold: float = 0.5

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        origins = [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]
        if "*" in origins:
            return ["*"]
        return origins

    def resolve_checkpoint(self, model_id: str) -> Path:
        """Find the checkpoint path on disk whether running in Docker or natively."""
        target_name = {
            "vcanet": "vcanet_best.pth",
            "dlka": "dlka_best.pth",
            "patcher": "patcher_best.ckpt",
            "classification": "classification_best.pth",
            "modality": "modality.pth",
        }.get(model_id, "vcanet_best.pth")

        env_path = {
            "vcanet": self.vcanet_checkpoint,
            "dlka": self.dlka_checkpoint,
            "patcher": self.patcher_checkpoint,
            "classification": self.classification_checkpoint,
            "modality": self.modality_checkpoint,
        }.get(model_id, self.vcanet_checkpoint)

        candidates = [
            Path(env_path),
            Path(f"/checkpoints/{target_name}"),
            Path(f"checkpoints/{target_name}"),
            Path(f"../checkpoints/{target_name}"),
            Path(__file__).parents[3] / "checkpoints" / target_name,
            Path(__file__).parents[3] / target_name,
            Path(target_name),
            Path(f"../{target_name}"),
        ]

        for p in candidates:
            if p.is_file():
                return p.resolve()

        return Path(env_path)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
