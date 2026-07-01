import json
import joblib

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)

from preprocess import preprocess_data
from config import MODEL_PATH, METRICS_PATH


def evaluate_model():
    # Load trained model
    model = joblib.load(MODEL_PATH)

    # Get test data
    _, X_test, _, y_test = preprocess_data()

    # Predictions
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    # Metrics
    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1_score": f1_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_prob)
    }

    # Save metrics
    with open(METRICS_PATH, "w") as f:
        json.dump(metrics, f, indent=4)

    print("=" * 60)
    print("MODEL EVALUATION")
    print("=" * 60)

    for key, value in metrics.items():
        print(f"{key:<12}: {value:.4f}")

    print("\nConfusion Matrix")
    print(confusion_matrix(y_test, y_pred))

    print("\nClassification Report")
    print(classification_report(y_test, y_pred))


if __name__ == "__main__":
    evaluate_model()