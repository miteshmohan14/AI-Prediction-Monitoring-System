from datetime import datetime
from pydantic import BaseModel


class LogResponse(BaseModel):
    id: int
    timestamp: datetime
    prediction: int
    label: str
    confidence: float
    latency: float
    amount: float

    class Config:
        from_attributes = True      # Pydantic v2