from fastapi import APIRouter
import psutil

router = APIRouter()


@router.get("/system-metrics")
def get_system_metrics():

    return {
        "cpu": psutil.cpu_percent(interval=0.2),

        "memory": psutil.virtual_memory().percent,

        "disk": psutil.disk_usage("/").percent,

        "api": "Healthy"
    }