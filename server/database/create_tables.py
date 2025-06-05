import asyncio
from .database import engine, Base
from .models import RecognitionDB

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
