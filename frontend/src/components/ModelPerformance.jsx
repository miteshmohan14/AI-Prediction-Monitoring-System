import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./ModelPerformance.css";

function ModelPerformance() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchMetrics = async () => {
    try {
      const response = await api.get("/metrics");

      setMetrics(response.data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching metrics:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();

    const timer = setInterval(fetchMetrics, 5000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="performance-card">
        <h2>Model Performance</h2>
        <p>Loading metrics...</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="performance-card">
        <h2>Model Performance</h2>
        <p>Unable to load metrics.</p>
      </div>
    );
  }

  const metricCard = (title, value) => (
    <div className="metric-container">
      <div className="metric-row">
        <span>{title}</span>
        <strong>{value.toFixed(2)}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="performance-card">
      <div className="performance-header">
        <h2>Model Performance</h2>

        <span className="updated-time">
          Updated: {lastUpdated.toLocaleTimeString()}
        </span>
      </div>

      {metricCard("Accuracy", metrics.accuracy)}

      {metricCard("Precision", metrics.precision)}

      {metricCard("Recall", metrics.recall)}

      {metricCard("F1 Score", metrics.f1_score)}

      {metricCard("ROC-AUC", metrics.roc_auc)}
    </div>
  );
}

export default ModelPerformance;