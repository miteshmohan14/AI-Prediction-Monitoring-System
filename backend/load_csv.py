import pandas as pd
from datetime import datetime

from app.database.database import SessionLocal, engine
from app.database.models import Base, PredictionLog

# Create table if it doesn't exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear existing data
db.query(PredictionLog).delete()
db.commit()

# Load CSV
df = pd.read_csv("app/database/prediction_logs.csv")

for _, row in df.iterrows():

    record = PredictionLog(
        prediction=int(row["Prediction"]),
        label=row["Label"],
        confidence=float(row["Confidence"]),
        latency=float(row["Latency"]),
        amount=float(row["Amount"]),
        timestamp=datetime.fromisoformat(str(row["Timestamp"]))
    )

    db.add(record)

db.commit()
db.close()

print(f"Successfully imported {len(df)} records!")