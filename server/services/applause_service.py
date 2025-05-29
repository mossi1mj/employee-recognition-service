from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from models.applause import Applause, ApplauseCreate, ApplauseResponse
from database.models import ApplauseDB
from database.database import SessionLocal
from services.user_service import fetch_user_by_id

async def create_applause(applause_data: ApplauseCreate) -> ApplauseResponse:
    sender = await fetch_user_by_id(applause_data.sender_id)
    recipient = await fetch_user_by_id(applause_data.recipient_id)

    applause = Applause(
        sender_id=applause_data.sender_id,
        recipient_id=applause_data.recipient_id,
        category=applause_data.category,
        message=applause_data.message,
    )
    applause.generate(sender.firstName, recipient.firstName)

    async with SessionLocal() as session:
        db_applause = ApplauseDB(
            sender_id=applause.sender_id,
            recipient_id=applause.recipient_id,
            category=applause.category.value,
            message=applause.message,
            headline=applause.headline
        )
        session.add(db_applause)
        await session.commit()
        await session.refresh(db_applause)

    return ApplauseResponse(
        id=str(db_applause.id),
        sender=sender,
        recipient=recipient,
        category=applause.category,
        message=applause.message,
        headline=applause.headline,
        created_at=db_applause.created_at
    )



async def get_all_applauses(sender_id: int = None, recipient_id: int = None) -> list[ApplauseResponse]:
    async with SessionLocal() as session:
        result = await session.execute(select(ApplauseDB))
        db_applauses = result.scalars().all()

    applauses = []
    for db_applause in db_applauses:
        sender = await fetch_user_by_id(db_applause.sender_id)
        recipient = await fetch_user_by_id(db_applause.recipient_id)

        applause = ApplauseResponse(
            id=str(db_applause.id),
            sender=sender,
            recipient=recipient,
            category=db_applause.category,
            message=db_applause.message,
            headline=db_applause.headline,
            created_at=db_applause.created_at
        )
        applauses.append(applause)

    return applauses
