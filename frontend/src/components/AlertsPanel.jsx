import React from "react";
import "./AlertsPanel.css";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";

function AlertsPanel({ logs }) {
  const alerts = [];

  logs
    .slice()
    .reverse()
    .forEach((log) => {

      if (log.label === "Fraud") {

        alerts.push({
          type: "danger",
          title: "Fraud Detected",
          message: `Transaction #${log.id}`,
          time: new Date(log.timestamp).toLocaleTimeString(),
        });

      }

      if (Number(log.latency) > 200) {

        alerts.push({
          type: "warning",
          title: "High Latency",
          message: `${Number(log.latency).toFixed(1)} ms`,
          time: new Date(log.timestamp).toLocaleTimeString(),
        });

      }

    });

  if (alerts.length === 0) {

    alerts.push({
      type: "success",
      title: "System Healthy",
      message: "No active alerts",
      time: new Date().toLocaleTimeString(),
    });

  }

  const getIcon = (type) => {

    switch (type) {

      case "danger":
        return <FaExclamationTriangle />;

      case "warning":
        return <FaExclamationTriangle />;

      case "success":
        return <FaCheckCircle />;

      default:
        return <FaInfoCircle />;

    }

  };

  return (
    <div className="alerts-panel">
      <h2>🚨 System Alerts</h2>

      {alerts
        .slice(0, 5)
        .map((alert, index) => (

          <div
            key={index}
            className={`alert-card ${alert.type}`}
          >

            <div className="alert-header">

              <div className="alert-title">

                {getIcon(alert.type)}

                <h4>{alert.title}</h4>

              </div>

              <div className="alert-time">

                <FaClock />

                {alert.time}

              </div>

            </div>

            <p>{alert.message}</p>

          </div>

        ))}
    </div>
  );
}

export default AlertsPanel;
