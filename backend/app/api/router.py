from fastapi import APIRouter, File, Form, UploadFile

from app.api.routes.analysis import router as analysis_router
from app.api.routes.health import router as health_router
from app.services.inference import analyze_upload

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(analysis_router)


@api_router.post("/predict", tags=["analysis"])
async def predict_direct(
    file: UploadFile = File(...),
    model: str = Form("vcanet"),
    threshold: float = Form(0.5),
) -> dict[str, object]:
    return await analyze_upload(file, model_id=model, threshold=threshold)
