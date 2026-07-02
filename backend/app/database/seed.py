import os
import pandas as pd
from datetime import datetime

from app.database.database import SessionLocal
from app.database.models import PredictionLog


def seed_database():
    db = SessionLocal()

    try:
        # If data already exists, do nothing
        if db.query(PredictionLog).count() > 0:
            print("Database already contains data.")
            return

        csv_path = os.path.join(
            os.path.dirname(__file__),
            "prediction_logs.csv"
        )

        df = pd.read_csv(csv_path)

        for _, row in df.iterrows():

            record = PredictionLog(
                prediction=int(row["Prediction"]),
                label=row["Label"],
                confidence=float(row["Confidence"]),
                latency=float(row["Latency"]),
                amount=float(row["Amount"]),
                timestamp=datetime.fromisoformat(
                    row["Timestamp"]
                )
            )

            db.add(record)

        db.commit()

        print(f"Imported {len(df)} prediction logs.")

    except Exception as e:
        print("Database seed failed:", e)

    finally:
        db.close()