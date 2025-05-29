from fastapi import APIRouter
from models.applause import Applause
from services import applause_service

router = APIRouter(prefix="/applause", tags=["applause"])

@router.post("/", response_model=Applause)
async def post_applause(applause: Applause):
    return await applause_service.create_applause(applause)
