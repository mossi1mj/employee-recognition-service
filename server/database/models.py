
from pydantic import BaseModel
from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, func


class ApplauseDB(Base):
    __tablename__ = "applause"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer)
    recipient_id = Column(Integer)
    category = Column(String)
    message = Column(String)
    headline = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)