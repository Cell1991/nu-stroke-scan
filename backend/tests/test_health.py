from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_exposes_docs_link() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["docs"] == "/docs"
