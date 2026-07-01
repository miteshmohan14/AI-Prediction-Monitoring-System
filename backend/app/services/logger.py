from app.database.database import SessionLocal
from app.database.models import PredictionLog


def log_prediction(
    prediction,
    label,
    confidence,
    latency,
    amount
):
    db = SessionLocal()

    record = PredictionLog(
        prediction=prediction,
        label=label,
        confidence=confidence,
        latency=latency,
        amount=amount
    )

    db.add(record)
    db.commit()
    db.close()