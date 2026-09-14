from fastapi import APIRouter, File, Form, UploadFile

from app.services.inference import analyze_upload

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("")
async def analyze_image(file: UploadFile = File(...), threshold: float = Form(0.5)) -> dict[str, object]:
    return await analyze_upload(file, threshold)