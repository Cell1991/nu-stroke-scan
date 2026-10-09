import io
from fastapi.testclient import TestClient
from PIL import Image

from app.main import app

client = TestClient(app)


def test_list_models() -> None:
    response = client.get("/api/analysis/models")
    assert response.status_code == 200
    models = response.json()
    assert isinstance(models, list)
    model_ids = [m["id"] for m in models]
    assert "vcanet" in model_ids
    assert "dlka" in model_ids
    assert "patcher" in model_ids


def create_synthetic_brain_ct() -> io.BytesIO:
    from PIL import ImageDraw

    img = Image.new("RGB", (224, 224), color=(0, 0, 0))
    draw = ImageDraw.Draw(img)
    # Skull outer ring
    draw.ellipse([30, 20, 194, 204], fill=(220, 220, 220))
    # Brain tissue
    draw.ellipse([36, 26, 188, 198], fill=(90, 90, 90))
    # Ventricles
    draw.ellipse([100, 90, 124, 134], fill=(20, 20, 20))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return buf


def test_analyze_image_vcanet() -> None:
    buf = create_synthetic_brain_ct()
    response = client.post(
        "/api/analysis",
        files={"file": ("test_scan.png", buf, "image/png")},
        data={"model": "vcanet", "threshold": "0.5"},
    )
    assert response.status_code == 200
    payload = response.json()
    assert "lesion_detected" in payload
    assert "confidence" in payload
    assert "mask_png_base64" in payload
    assert payload["model"] == "vcanet"
    assert "modality" in payload
    assert payload["modality"]["is_valid"] is True


def test_reject_invalid_modality() -> None:
    # A flat gray or white image is not a brain CT scan and must be rejected with 422
    img = Image.new("RGB", (224, 224), color=(255, 255, 255))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    response = client.post(
        "/api/analysis",
        files={"file": ("invalid_photo.png", buf, "image/png")},
        data={"model": "vcanet", "threshold": "0.5"},
    )
    assert response.status_code == 422
    detail = response.json().get("detail", "")
    assert "Brain CT" in str(detail)


def test_reject_color_logo() -> None:
    # A color graphic / university logo with bright colors must be rejected with 422
    from PIL import ImageDraw
    img = Image.new("RGB", (256, 256), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    draw.ellipse([30, 30, 226, 226], fill=(0, 128, 0))
    draw.rectangle([60, 60, 196, 196], fill=(255, 200, 0))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    response = client.post(
        "/api/analysis",
        files={"file": ("RRU_logo.png", buf, "image/png")},
        data={"model": "vcanet", "threshold": "0.5"},
    )
    assert response.status_code == 422
    detail = response.json().get("detail", "")
    assert "Brain CT" in str(detail)

