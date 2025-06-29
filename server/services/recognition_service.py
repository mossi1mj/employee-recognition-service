import json
from fastapi import Query
from services.moderation import check_message_moderation
from services.ws_manager import manager
from typing import Optional
from services.utils import recognitions_to_response
from sqlalchemy.future import select
from sqlalchemy import select, desc
from models.recognition import Recognition, RecognitionCreate, RecognitionResponse, RecognitionType 
from database.models import RecognitionDB
from database.database import SessionLocal
from services.user_service import fetch_user_by_id

async def broadcast_new_recognition(recognition: RecognitionResponse, connections):
    for ws in connections:
        try:
            await ws.send_text(json.dumps(recognition.dict()))
        except Exception:
            connections.remove(ws)

async def create_recognition(recognition_data: RecognitionCreate) -> RecognitionResponse:
    await check_message_moderation(recognition_data.message)
    
    sender = await fetch_user_by_id(recognition_data.sender_id)
    recipient = await fetch_user_by_id(recognition_data.recipient_id)

    recognition = Recognition(
        sender_id=recognition_data.sender_id,
        recipient_id=recognition_data.recipient_id,
        category=recognition_data.category,
        message=recognition_data.message,
    )
    recognition.generate(sender.firstName, recipient.firstName)

    async with SessionLocal() as session:
        db_recognition = RecognitionDB(
            sender_id=recognition.sender_id,
            recipient_id=recognition.recipient_id,
            category=recognition.category.value,
            message=recognition.message,
            headline=recognition.headline
        )
        session.add(db_recognition)
        await session.commit()
        await session.refresh(db_recognition)

    response = RecognitionResponse(
        id=str(db_recognition.id),
        sender=sender,
        recipient=recipient,
        category=recognition.category,
        message=recognition.message,
        headline=recognition.headline,
        created_at=db_recognition.created_at
    )
    await manager.broadcast(json.dumps(response.dict(), default=str))

    return response

async def get_all_recognitions(
    sender_id: Optional[int] = None,
    recipient_id: Optional[int] = None,
    limit: Optional[int] = Query(None, ge=0),
    skip: Optional[int] = Query(0, ge=0)
) -> list[RecognitionResponse]:
    async with SessionLocal() as session:
        query = select(RecognitionDB).order_by(desc(RecognitionDB.created_at))

        # Filter by sender and/or recipient
        if sender_id is not None:
            query = query.where(RecognitionDB.sender_id == sender_id)
        if recipient_id is not None:
            query = query.where(RecognitionDB.recipient_id == recipient_id)

        # Apply pagination only if limit is not 0
        if limit != 0:
            query = query.offset(skip).limit(limit)

        result = await session.execute(query)
        db_recognitions = result.scalars().all()

    return await recognitions_to_response(db_recognitions)

async def get_user_recognitions(
    user_id: int,
    type: RecognitionType = RecognitionType.ALL,
    limit: Optional[int] = None,
    skip: int = 0
):
    async with SessionLocal() as session:
        query = select(RecognitionDB)

        if type == RecognitionType.SENT:
            query = query.where(RecognitionDB.sender_id == user_id)
        elif type == RecognitionType.RECEIVED:
            query = query.where(RecognitionDB.recipient_id == user_id)
        else:
            query = query.where(
                (RecognitionDB.sender_id == user_id) |
                (RecognitionDB.recipient_id == user_id)
            )

        query = query.order_by(desc(RecognitionDB.created_at))

        if limit != 0:
            query = query.offset(skip)
            if limit is not None:
                query = query.limit(limit)

        result = await session.execute(query)
        return await recognitions_to_response(result.scalars().all())