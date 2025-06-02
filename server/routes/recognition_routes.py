from fastapi import APIRouter, Query
from models.recognition import RecognitionCreate, RecognitionResponse, RecognitionType
from services import recognition_service
from typing import List, Optional

router = APIRouter(prefix="/recognition", tags=["recognition"])

@router.post("/", response_model=RecognitionResponse)
async def post_recognition(recognition: RecognitionCreate):
    return await recognition_service.create_recognition(recognition)

@router.get("/", response_model=List[RecognitionResponse])
async def get_recognitions(
    sender_id: Optional[int] = Query(None),
    recipient_id: Optional[int] = Query(None),
    limit: Optional[int] = Query(None, ge=0),
    skip: Optional[int] = Query(0, ge=0),
):
    return await recognition_service.get_all_recognitions(
        sender_id=sender_id,
        recipient_id=recipient_id,
        limit=limit,
        skip=skip,
    )

@router.get("/user/{user_id}", response_model=List[RecognitionResponse])
async def get_user_recognitions(
    user_id: int,
    type: RecognitionType = RecognitionType.ALL,
    limit: Optional[int] = Query(None, ge=0),
    skip: int = Query(0, ge=0)
):
    return await recognition_service.get_user_recognitions(user_id, type, limit, skip)