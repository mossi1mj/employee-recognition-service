from models.applause import Applause
from fastapi import HTTPException
from typing import List
from services.user_service import fetch_user_by_id

# Temporary in-memory DB
applause_db: List[Applause] = []

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
    
    applause_db.append(applause)
    print(f"Applause created: {applause.model_dump()}")
    print(f"Current applause DB: {[a.model_dump() for a in applause_db]}")
    return applause
