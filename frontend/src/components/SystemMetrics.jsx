import React, { useEffect, useState } from "react";
import "./SystemMetrics.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaServer,
} from "react-icons/fa";

import api from "../services/api";

function SystemMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    api: "Checking...",
  });

  // ===============================
  // Fetch System Metrics
  // ===============================

  const fetchMetrics = async () => {
    try {
      const response = await api.get("/system-metrics");

      setMetrics({
        cpu: response.data.cpu,
        memory: response.data.memory,
        disk: response.data.disk,
        api: response.data.api,
      });
    } catch (error) {
      console.error("Error fetching system metrics:", error);

      setMetrics((prev) => ({
        ...prev,
        api: "Offline",
      }));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMetrics();

    // Refresh every 3 seconds
    const timer = setInterval(fetchMetrics, 3000);

    return () => clearInterval(timer);
  }, []);

  const MetricCard = ({ title, value, icon }) => (
    <div className="metric-card">
      <div className="metric-header">
        <span>{title}</span>
        {icon}
      </div>

      <div className="metric-circle">
        <CircularProgressbar
          value={value}
          text={`${Math.round(value)}%`}
          styles={{
            path: {
              stroke: "#4CAF50",
              strokeLinecap: "round",
            },
            trail: {
              stroke: "#2c2c3c",
            },
            text: {
              fill: "#ffffff",
              fontSize: "18px",
              fontWeight: "bold",
            },
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="system-metrics">
      <MetricCard
        title="CPU Usage"
        value={metrics.cpu}
        icon={<FaMicrochip />}
      />

      <MetricCard
        title="Memory Usage"
        value={metrics.memory}
        icon={<FaMemory />}
      />

      <MetricCard
        title="Disk Usage"
        value={metrics.disk}
        icon={<FaHdd />}
      />

      <div className="metric-card">
        <div className="metric-header">
          <span>API Status</span>
          <FaServer />
        </div>

        <div className="api-status">
          <div
            className="status-dot"
            style={{
              background:
                metrics.api === "Healthy"
                  ? "#4CAF50"
                  : "#F44336",
              boxShadow:
                metrics.api === "Healthy"
                  ? "0 0 10px #4CAF50"
                  : "0 0 10px #F44336",
            }}
          ></div>

          <div>
            <h2
              style={{
                color:
                  metrics.api === "Healthy"
                    ? "#4CAF50"
                    : "#F44336",
              }}
            >
              {metrics.api}
            </h2>

            <p>
              {metrics.api === "Healthy"
                ? "FastAPI Server Running"
                : "Unable to reach API"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemMetrics;