from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from backend.app.database.database import Base


class PredictionLog(Base):

    __tablename__ = "prediction_logs"

    id = Column(Integer, primary_key=True, index=True)

    timestamp = Column(DateTime, default=datetime.utcnow)

    prediction = Column(Integer)

    label = Column(String)

    confidence = Column(Float)

    latency = Column(Float)

    amount = Column(Float)