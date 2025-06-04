from fastapi import WebSocket, WebSocketDisconnect, APIRouter
from services.ws_manager import manager

router = APIRouter()

@router.websocket("/ws/recognitions")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
