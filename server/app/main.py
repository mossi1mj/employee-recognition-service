from fastapi import FastAPI, Query
from models.user import User
from services import user_service

app = FastAPI()


@app.get("/users", response_model=list[User])
async def get_all_users():
    return await user_service.fetch_users()


@app.get("/users/search", response_model=list[User])
async def search_users(q: str = Query(..., description="Search query string")):
    return await user_service.search_users(q)


@app.get("/users/filter", response_model=list[User])
async def filter_users(
    key: str = Query(..., description="Key to filter on (e.g., role)"),
    value: str = Query(..., description="Value to match (e.g., admin)"),
):
    return await user_service.filter_users(key, value)

@app.get("/users/{user_id}", response_model=User)
async def get_user_by_id(user_id: int):
    return await user_service.fetch_user_by_id(user_id)
