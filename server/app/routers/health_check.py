from fastapi import APIRouter

from app import schemas

router = APIRouter()


@router.get("/", operation_id="health_check", response_model=schemas.HealthCheck)
def health_check():
    return {"status": "ok"}
