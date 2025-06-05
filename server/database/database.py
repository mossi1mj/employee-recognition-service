import os
from dotenv import load_dotenv

load_dotenv()  # load variables from .env

PROD_DATABASE_USER = os.getenv("PROD_DATABASE_USER")
PROD_DATABASE_PASSWORD = os.getenv("PROD_DATABASE_PASSWORD")
PROD_DATABASE_HOST = os.getenv("PROD_DATABASE_HOST")
PROD_DATABASE_PORT = os.getenv("PROD_DATABASE_PORT")
PROD_DATABASE_NAME = os.getenv("PROD_DATABASE_NAME")

DATABASE_URL = (
    f"postgresql+asyncpg://{PROD_DATABASE_USER}:{PROD_DATABASE_PASSWORD}@"
    f"{PROD_DATABASE_HOST}:{PROD_DATABASE_PORT}/{PROD_DATABASE_NAME}"
)

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()