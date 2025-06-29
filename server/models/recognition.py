from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional
from uuid import uuid4
from datetime import datetime

from models.user import User

class RecognitionType(str, Enum):
    SENT = "sent"
    RECEIVED = "received"
    ALL = "all"

class RecognitionCategory(str, Enum):
    teamwork = "teamwork"
    innovation = "innovation"
    leadership = "leadership"
    helpfulness = "helpfulness"
    excellence = "excellence"
    positivity = "positivity"

CATEGORY_METADATA = {
    "teamwork": {
        "headline_template": "{sender} thinks {recipient} is a great team player!",
        "default_message": "Thanks for being such a strong collaborator. You're an essential part of the team."
    },
    "innovation": {
        "headline_template": "{sender} is amazed by {recipient}'s creativity!",
        "default_message": "Your innovative thinking is inspiring and drives us forward."
    },
    "leadership": {
        "headline_template": "{recipient} leads the way — says {sender}!",
        "default_message": "Your leadership brings out the best in everyone around you."
    },
    "helpfulness": {
        "headline_template": "{sender} is grateful for {recipient}'s help!",
        "default_message": "Thank you for always being ready to lend a hand. You're a lifesaver!"
    },
    "excellence": {
        "headline_template": "{sender} says {recipient} is crushing it!",
        "default_message": "Your dedication to excellence sets the standard for all of us."
    },
    "positivity": {
        "headline_template": "{sender} appreciates {recipient}'s great vibes!",
        "default_message": "Your positivity is contagious and makes the workplace better for everyone."
    }
}

class Recognition(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    sender_id: int
    recipient_id: int
    category: RecognitionCategory
    message: Optional[str] = None
    headline: Optional[str] = None

    def generate(self, sender_name: str, recipient_name: str):
        meta = CATEGORY_METADATA[self.category.value]

        self.headline = meta["headline_template"].format(sender=sender_name, recipient=recipient_name)

        if not self.message or self.message.strip() == "":
            self.message = meta["default_message"]

class RecognitionResponse(BaseModel):
    id: str
    sender: User
    recipient: User
    category: RecognitionCategory
    message: Optional[str]
    headline: Optional[str]
    created_at: datetime

class RecognitionCreate(BaseModel):
    sender_id: int
    recipient_id: int
    category: RecognitionCategory
    message: Optional[str] = None