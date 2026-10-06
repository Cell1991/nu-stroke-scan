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


def test_analyze_image_vcanet() -> None:
    # Create a small 224x224 grayscale test image
    img = Image.new("L", (224, 224), color=128)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

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
