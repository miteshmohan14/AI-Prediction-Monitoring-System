from pathlib import Path

# Root directory of the project
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Dataset path
DATASET_PATH = PROJECT_ROOT / "datasets" / "creditcard.csv"

# Artifacts directory
ARTIFACTS_DIR = PROJECT_ROOT / "ml" / "artifacts"

# Create artifacts directory if it doesn't exist
ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

# Saved artifacts
MODEL_PATH = ARTIFACTS_DIR / "fraud_detection_model.pkl"
SCALER_PATH = ARTIFACTS_DIR / "scaler.pkl"
METRICS_PATH = ARTIFACTS_DIR / "metrics.json"