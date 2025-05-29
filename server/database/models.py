from pydantic import BaseModel
from database.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class ApplauseDB(Base):
    __tablename__ = "applause"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer)
    recipient_id = Column(Integer)
    category = Column(String)
    message = Column(String)
    headline = Column(String)