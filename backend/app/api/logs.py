from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.models import PredictionLog
from app.schemas.log_response import LogResponse

router = APIRouter()


@router.get("/logs", response_model=list[LogResponse])
def get_logs():

    db: Session = SessionLocal()

    logs = (
        db.query(PredictionLog)
        .order_by(PredictionLog.id.desc())
        .all()
    )

    db.close()

    return logs