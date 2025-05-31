from fastapi import APIRouter, Query
from models.recognition import RecognitionCreate, RecognitionResponse
from services import recognition_service
from typing import List, Optional

router = APIRouter(prefix="/recognition", tags=["recognition"])

@router.post("/", response_model=RecognitionResponse)
async def post_recognition(recognition: RecognitionCreate):
    return await recognition_service.create_recognition(recognition)

@router.get("/", response_model=List[RecognitionResponse])
async def get_recognitions(
    sender_id: Optional[int] = Query(None),
    recipient_id: Optional[int] = Query(None)
):
    return await recognition_service.get_all_recognitions(sender_id, recipient_id)