from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = PROJECT_ROOT / "ml" / "artifacts" / "fraud_detection_model.pkl"
SCALER_PATH = PROJECT_ROOT / "ml" / "artifacts" / "scaler.pkl"