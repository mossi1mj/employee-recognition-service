from pydantic import BaseModel
from typing import Optional

class CompanyInfo(BaseModel):
    department: str
    title: str

class User(BaseModel):
    id: int
    firstName: str
    lastName: str
    gender: str
    email: str
    username: str
    password: str
    image: str
    company: CompanyInfo
    role: str
