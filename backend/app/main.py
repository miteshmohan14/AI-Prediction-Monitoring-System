from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.predict import router as predict_router
from backend.app.api.health import router as health_router
from backend.app.api.logs import router as logs_router
from backend.app.api.metrics import router as metrics_router
from backend.app.api.system_metrics import router as system_router
from backend.app.websocket.websocket import router as websocket_router

app = FastAPI(
    title="AI Prediction Monitoring System",
    version="1.0.0",
    description="Enterprise AI Prediction Monitoring Dashboard API"
)

# =====================================================
# CORS Configuration
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Root Endpoint
# =====================================================

@app.get("/")
def root():
    return {
        "message": "AI Prediction Monitoring System Running",
        "version": "1.0.0",
        "status": "Healthy"
    }

# =====================================================
# API Routes
# =====================================================

app.include_router(health_router)
app.include_router(predict_router)
app.include_router(logs_router)
app.include_router(metrics_router)
app.include_router(system_router)
app.include_router(websocket_router)