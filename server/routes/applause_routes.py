from fastapi import APIRouter
from models.applause import Applause
from services import applause_service
from typing import List

router = APIRouter(prefix="/applause", tags=["applause"])

@router.post("/", response_model=Applause)
async def post_applause(applause: Applause):
    return await applause_service.create_applause(applause)

@router.get("/", response_model=List[Applause])
async def get_applauses():
    return await applause_service.get_all_applauses()