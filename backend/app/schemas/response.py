from pydantic import BaseModel


class PredictionResponse(BaseModel):
    prediction: int
    label: str
    confidence: float
    latency_ms: float