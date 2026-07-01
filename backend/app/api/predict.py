import time
from datetime import datetime

from fastapi import APIRouter

from backend.app.schemas.request import PredictionRequest
from backend.app.schemas.response import PredictionResponse

from backend.app.services.predictor import predictor
from backend.app.services.logger import log_prediction

from backend.app.websocket.connection_manager import manager

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):

    start = time.perf_counter()

    # =====================================
    # Convert request into dictionary
    # =====================================

    features = request.model_dump()

    # =====================================
    # Run Prediction
    # =====================================

    prediction, probability = predictor.predict(features)

    # =====================================
    # Calculate Latency
    # =====================================

    latency = (time.perf_counter() - start) * 1000

    # =====================================
    # Prediction Label
    # =====================================

    label = "Fraud" if prediction == 1 else "Normal"

    # =====================================
    # Save to Database
    # =====================================

    log_prediction(
        prediction=int(prediction),
        label=label,
        confidence=float(probability),
        latency=round(latency, 2),
        amount=features["Amount"],
    )

    # =====================================
    # Broadcast to all WebSocket clients
    # =====================================

    await manager.broadcast(
        {
            "type": "prediction",
            "data": {
                "prediction": int(prediction),
                "label": label,
                "confidence": float(probability),
                "latency": round(latency, 2),
                "amount": features["Amount"],
                "timestamp": datetime.now().isoformat(),
            },
        }
    )

    # =====================================
    # Return API Response
    # =====================================

    return PredictionResponse(
        prediction=int(prediction),
        label=label,
        confidence=float(probability),
        latency_ms=round(latency, 2),
    )