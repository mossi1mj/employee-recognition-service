from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.recognition_routes import router as recognition_router
from routes.user_routes import router as user_router

app = FastAPI()

app.include_router(recognition_router)
app.include_router(user_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
