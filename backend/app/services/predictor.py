import joblib
import numpy as np

from app.core.config import MODEL_PATH, SCALER_PATH


class Predictor:

    def __init__(self):
        # Load trained model and scaler
        self.model = joblib.load(MODEL_PATH)
        self.scaler = joblib.load(SCALER_PATH)

    def predict(self, features: dict):
        """
        Predict whether a transaction is fraudulent.
        """

        feature_order = [
            "Time",
            "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9",
            "V10", "V11", "V12", "V13", "V14", "V15", "V16",
            "V17", "V18", "V19", "V20", "V21", "V22", "V23",
            "V24", "V25", "V26", "V27", "V28",
            "Amount"
        ]

        # Ensure all required features exist
        try:
            values = [features[col] for col in feature_order]
        except KeyError as e:
            raise ValueError(f"Missing feature: {e}")

        # Convert to NumPy array
        data = np.array(values, dtype=float).reshape(1, -1)

        # Scale only Time and Amount
        scaled = self.scaler.transform([[data[0, 0], data[0, 29]]])

        data[0, 0] = scaled[0, 0]
        data[0, 29] = scaled[0, 1]

        # Make prediction
        prediction = int(self.model.predict(data)[0])

        # Get probability
        proba = self.model.predict_proba(data)
        probability = float(proba[0][1])

        # Debug logs
        print("\n" + "=" * 60)
        print("Prediction Request")
        print("=" * 60)
        print("Input Shape       :", data.shape)
        print("Prediction        :", prediction)
        print("Predict Proba     :", proba)
        print("Fraud Probability :", probability)
        print("=" * 60)

        return prediction, probability


predictor = Predictor()