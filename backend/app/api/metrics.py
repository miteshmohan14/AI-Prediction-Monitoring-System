from fastapi import APIRouter

router = APIRouter()

@router.get("/metrics")
def get_metrics():
    """
    Model performance metrics.
    Replace these values with dynamically computed metrics later.
    """

    return {
        "accuracy": 99.84,
        "precision": 97.62,
        "recall": 94.18,
        "f1_score": 95.87,
        "roc_auc": 99.12
    }