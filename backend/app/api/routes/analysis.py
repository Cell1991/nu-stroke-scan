from fastapi import APIRouter, File, Form, UploadFile

from app.services.inference import analyze_upload

router = APIRouter(prefix="/analysis", tags=["analysis"])

MODELS = [
    {"id": "vcanet", "label": "VCA-Net"},
    {"id": "dlka", "label": "Deformable LKA"},
    {"id": "patcher", "label": "Patcher (SegFormer)"},
]


@router.get("/models")
async def list_models() -> list[dict[str, str]]:
    return MODELS


@router.post("")
async def analyze_image(file: UploadFile = File(...), model: str = Form("vcanet"), threshold: float = Form(0.5)) -> dict[str, object]:
    return await analyze_upload(file, model_id=model, threshold=threshold)
