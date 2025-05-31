from sqlalchemy.future import select
from sqlalchemy import select, desc
from models.recognition import Recognition, RecognitionCreate, RecognitionResponse 
from database.models import RecognitionDB
from database.database import SessionLocal
from services.user_service import fetch_user_by_id

async def create_recognition(recognition_data: RecognitionCreate) -> RecognitionResponse:
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

    return RecognitionResponse(
        id=str(db_recognition.id),
        sender=sender,
        recipient=recipient,
        category=recognition.category,
        message=recognition.message,
        headline=recognition.headline,
        created_at=db_recognition.created_at
    )

async def get_all_recognitions(sender_id: int = None, recipient_id: int = None) -> list[RecognitionResponse]:
    async with SessionLocal() as session:
        query = select(RecognitionDB).order_by(desc(RecognitionDB.created_at))

        # Optionally filter by sender or recipient
        if sender_id is not None:
            query = query.where(RecognitionDB.sender_id == sender_id)
        if recipient_id is not None:
            query = query.where(RecognitionDB.recipient_id == recipient_id)

        result = await session.execute(query)
        db_recognitions = result.scalars().all()

    recognitions = []
    for db_recognition in db_recognitions:
        sender = await fetch_user_by_id(db_recognition.sender_id)
        recipient = await fetch_user_by_id(db_recognition.recipient_id)

        recognition = RecognitionResponse(
            id=str(db_recognition.id),
            sender=sender,
            recipient=recipient,
            category=db_recognition.category,
            message=db_recognition.message,
            headline=db_recognition.headline,
            created_at=db_recognition.created_at
        )
        recognitions.append(recognition)

    return recognitions