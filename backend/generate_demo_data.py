import random
from datetime import datetime, timedelta
import pandas as pd

random.seed(42)

rows = []

start = datetime.now() - timedelta(days=30)

for i in range(5000):

    fraud = random.random() < 0.03

    prediction = 1 if fraud else 0
    label = "Fraud" if fraud else "Normal"

    confidence = (
        round(random.uniform(0.80, 0.999), 4)
        if fraud
        else round(random.uniform(0.50, 0.98), 4)
    )

    latency = round(random.uniform(8, 150), 2)

    amount = (
        round(random.uniform(2000, 50000), 2)
        if fraud
        else round(random.uniform(5, 15000), 2)
    )

    timestamp = start + timedelta(
        seconds=random.randint(0, 30 * 24 * 3600)
    )

    rows.append(
        {
            "ID": i + 1,
            "Prediction": prediction,
            "Label": label,
            "Confidence": confidence,
            "Latency": latency,
            "Amount": amount,
            "Timestamp": timestamp.isoformat(),
        }
    )

df = pd.DataFrame(rows)

df.to_csv(
    "app/database/prediction_logs.csv",
    index=False,
)

print("Generated", len(df), "prediction logs.")