import httpx
from models.user import User


def transform_user(user: dict) -> User:
    return User(
        id=user["id"],
        firstName=user["firstName"],
        lastName=user["lastName"],
        gender=user["gender"],
        email=user["email"],
        username=user["username"],
        password=user["password"],
        image=f"https://i.pravatar.cc/150?u={user['id']}",
        company={
            "department": user["company"]["department"],
            "title": user["company"]["title"],
        },
        role=user["role"],
    )


async def fetch_users() -> list[User]:
    async with httpx.AsyncClient() as client:
        response = await client.get("https://dummyjson.com/users")
        data = response.json()["users"]
        return [transform_user(u) for u in data]
    
async def fetch_user_by_id(user_id: int) -> User:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://dummyjson.com/users/{user_id}")
        user = response.json()
        return transform_user(user)

async def search_users(query: str) -> list[User]:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://dummyjson.com/users/search?q={query}")
        data = response.json()["users"]
        return [transform_user(u) for u in data]


async def filter_users(user_id: int) -> list[User]:
    async with httpx.AsyncClient() as client:
        key = "role"
        user = await fetch_user_by_id(user_id)
        response = await client.get(f"https://dummyjson.com/users/filter?key={key}&value={user.role}")
        data = response.json()["users"]
        return [transform_user(u) for u in data if u["id"] != user.id]
    
