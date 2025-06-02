from typing import List

from database.models import RecognitionDB
from models.recognition import RecognitionResponse
from services.user_service import fetch_user_by_id


async def recognitions_to_response(db_recognitions: List[RecognitionDB]) -> List[RecognitionResponse]:
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