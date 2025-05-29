from fastapi import APIRouter, Query
from models.applause import Applause, ApplauseCreate, ApplauseResponse
from services import applause_service
from typing import List, Optional

router = APIRouter(prefix="/applause", tags=["applause"])

@router.post("/", response_model=ApplauseResponse)
async def post_applause(applause: ApplauseCreate):
    return await applause_service.create_applause(applause)

@router.get("/", response_model=List[ApplauseResponse])
async def get_applauses(
    sender_id: Optional[int] = Query(None),
    recipient_id: Optional[int] = Query(None)
):
    return await applause_service.get_all_applauses(sender_id, recipient_id)