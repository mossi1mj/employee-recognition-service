from fastapi import FastAPI
from routes.applause_routes import router as applause_router
from routes.user_routes import router as user_router

app = FastAPI()

app.include_router(applause_router)
app.include_router(user_router)
