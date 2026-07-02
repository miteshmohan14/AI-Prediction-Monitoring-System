# 🚀 AI Prediction Monitoring System

A full-stack AI Prediction Monitoring Dashboard built using **FastAPI**, **React.js**, **Machine Learning**, and **WebSockets**. The application enables real-time monitoring of AI model predictions, system performance, prediction confidence, and historical logs through an interactive dashboard.

---

## 📌 Features

- 🤖 Machine Learning Fraud Detection Model
- 📊 Real-Time Monitoring Dashboard
- ⚡ Live Prediction Updates using WebSockets
- 📈 Interactive Charts & Analytics
- 📜 Prediction History Logs
- 💻 System Resource Monitoring (CPU, Memory)
- 🎯 Prediction Confidence Tracking
- 📉 Latency Monitoring
- ☁️ Cloud Deployment on Render
- 🐳 Dockerized Backend

---

## 🛠 Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- Recharts
- React Toastify

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- WebSockets
- Pydantic
- Joblib

### Machine Learning
- Scikit-learn
- Random Forest Classifier
- StandardScaler
- Pandas
- NumPy

### Deployment
- Docker
- Render
- GitHub

---

# Project Structure

```
AI-Prediction-Monitoring-System
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── database
│   │   ├── schemas
│   │   ├── services
│   │   ├── websocket
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── ml
│   ├── artifacts
│   └── training
│
└── README.md
```

---

# Dashboard Features

### ✅ Live Prediction Monitoring

Displays

- Prediction Label
- Confidence Score
- Prediction Latency
- Transaction Amount

---

### ✅ System Metrics

Monitors

- CPU Usage
- Memory Usage
- Disk Usage
- Active Connections

---

### ✅ Analytics

Visualizes

- Fraud vs Normal Predictions
- Prediction Confidence
- Latency Trends
- Recent Prediction Logs

---

# Machine Learning Pipeline

```
Transaction Data
        │
        ▼
Feature Scaling
        │
        ▼
Random Forest Model
        │
        ▼
Prediction
        │
        ▼
Database Logging
        │
        ▼
Real-Time Dashboard
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/miteshmohan14/AI-Prediction-Monitoring-System.git

cd AI-Prediction-Monitoring-System
```

---

# Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Runs on

```
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm start
```

Runs on

```
http://localhost:3000
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Health Check |
| POST | /predict | Make Prediction |
| GET | /logs | Prediction Logs |
| GET | /metrics | Prediction Metrics |
| GET | /system-metrics | System Monitoring |
| WS | /ws | Live Prediction Updates |

---

# Deployment

## Backend

- Docker
- Render

## Frontend

- Render Static Site

---

# Screenshots

## Dashboard

<img width="1888" height="913" alt="dashboard png" src="https://github.com/user-attachments/assets/d4eabfa3-fba1-4ad7-9a8b-3688f3a88429" />

## Prediction Analytics

<img width="1887" height="912" alt="latency trend and chart png" src="https://github.com/user-attachments/assets/78729b08-e24d-44f2-8728-758585a26915" />


## System Monitoring

<img width="1892" height="822" alt="Model Performance png" src="https://github.com/user-attachments/assets/912956d8-64ac-49db-ab20-5f5a504227b7" />


## Prediction Logs

<img width="1891" height="908" alt="predictions png" src="https://github.com/user-attachments/assets/ad1b06e6-c039-41fe-9481-8f7183cf5f15" />

# Future Improvements

- PostgreSQL Integration
- User Authentication
- Model Version Monitoring
- Drift Detection
- Email Alerts
- Role-Based Access
- Kubernetes Deployment
- Prometheus & Grafana Integration

---

# Skills Demonstrated

- Machine Learning Deployment
- Full Stack Development
- REST API Development
- WebSocket Communication
- Docker
- Cloud Deployment
- SQLAlchemy ORM
- React.js
- FastAPI
- Data Visualization

---

# Author

**Mitesh Mohan Chauhan**

B.Tech Computer Science Engineering

- LinkedIn: https://linkedin.com/in/your-profile
- GitHub: https://github.com/miteshmohan14

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
