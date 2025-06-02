from fastapi import WebSocket, WebSocketDisconnect, APIRouter

router = APIRouter()

active_connections: list[WebSocket] = []

@router.websocket("/ws/recognitions")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)
