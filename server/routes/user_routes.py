from fastapi import APIRouter, Query
from services import user_service
from models.user import User

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=list[User])
async def get_all_users():
    return await user_service.fetch_users()


@router.get("/search", response_model=list[User])
async def search_users(q: str = Query(..., description="Search query string")):
    return await user_service.search_users(q)


@router.get("/filter", response_model=list[User])
async def filter_users(
    user_id: int = Query(..., description="User ID to compare specific key"),
):
    return await user_service.filter_users(user_id)

@router.get("/{user_id}", response_model=User)
async def get_user_by_id(user_id: int):
    return await user_service.fetch_user_by_id(user_id)