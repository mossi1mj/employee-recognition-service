from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from models.applause import Applause
from database.models import ApplauseDB
from database.database import SessionLocal
from services.user_service import fetch_user_by_id

async def create_applause(applause: Applause) -> Applause:
    sender = await fetch_user_by_id(applause.sender_id)
    recipient = await fetch_user_by_id(applause.recipient_id)

    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")
    if applause.sender_id == applause.recipient_id:
        raise HTTPException(status_code=400, detail="Sender and recipient cannot be the same user")

    applause.generate(sender_name=sender.firstName, recipient_name=recipient.firstName)

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
    
    applause.id = str(db_applause.id)  # Convert DB id int to string for Pydantic model
    return applause


async def get_all_applauses() -> list[Applause]:
    async with SessionLocal() as session:
        result = await session.execute(select(ApplauseDB))
        db_applauses = result.scalars().all()

    # Convert DB models to Pydantic Applause instances
    applauses = []
    for db_applause in db_applauses:
        applause = Applause(
            id=str(db_applause.id),
            sender_id=db_applause.sender_id,
            recipient_id=db_applause.recipient_id,
            category=db_applause.category,
            message=db_applause.message,
            headline=db_applause.headline
        )
        applauses.append(applause)
    return applauses
