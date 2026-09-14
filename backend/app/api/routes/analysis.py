from fastapi import APIRouter, File, UploadFile

from app.services.inference import analyze_upload

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("")
async def analyze_image(file: UploadFile = File(...)) -> dict[str, object]:
    return await analyze_upload(file)