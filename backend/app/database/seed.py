import os
import pandas as pd
from datetime import datetime

from app.database.database import SessionLocal
from app.database.models import PredictionLog


def seed_database():
    print("=" * 60)
    print("STARTING DATABASE SEED")
    print("=" * 60)

    db = SessionLocal()

    try:
        count = db.query(PredictionLog).count()
        print("Current rows:", count)

        if count > 0:
            print("Database already contains data.")
            return

        csv_path = os.path.join(
            os.path.dirname(__file__),
            "prediction_logs.csv"
        )

        print("CSV Path:", csv_path)
        print("CSV Exists:", os.path.exists(csv_path))

        df = pd.read_csv(csv_path)

        print("Rows in CSV:", len(df))

        for _, row in df.iterrows():

            record = PredictionLog(
                prediction=int(row["Prediction"]),
                label=row["Label"],
                confidence=float(row["Confidence"]),
                latency=float(row["Latency"]),
                amount=float(row["Amount"]),
                timestamp=datetime.fromisoformat(row["Timestamp"]),
            )

            db.add(record)

        db.commit()

        print("SUCCESS!")
        print("Imported", len(df), "records.")

    except Exception as e:
        db.rollback()
        print("SEED FAILED")
        print(type(e))
        print(e)

    finally:
        db.close()

    print("=" * 60)