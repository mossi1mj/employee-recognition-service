import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.recognition_routes import router as recognition_router
from routes.user_routes import router as user_router
from routes.ws import router as ws_router
from database.create_tables import init_models

load_dotenv()

origins = os.getenv("CORS_ORIGINS", "").split(",")

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_models()

app.include_router(recognition_router)
app.include_router(user_router)
app.include_router(ws_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)