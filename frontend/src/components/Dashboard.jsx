import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import api from "../services/api";

import { toast } from "react-toastify";

import LoadingBar from "react-top-loading-bar";

import Navbar from "./Navbar";
import BackendError from "./BackendError";
import LiveStatusBar from "./LiveStatusBar";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import SystemMetrics from "./SystemMetrics";
import FilterBar from "./FilterBar";
import AlertsPanel from "./AlertsPanel";
import AIModelHealth from "./AIModelHealth";
import SystemInfo from "./SystemInfo";
import ActivityFeed from "./ActivityFeed";
import QuickActions from "./QuickActions";
import ExportCSV from "./ExportCSV";
import ExportPDF from "./ExportPDF";

const PredictionTable = lazy(() => import("./PredictionTable"));
const LatencyChart = lazy(() => import("./LatencyChart"));
const PredictionPieChart = lazy(() => import("./PredictionPieChart"));
const ModelPerformance = lazy(() => import("./ModelPerformance"));

function Dashboard() {
  // ==========================================
  // Dashboard State
  // ==========================================

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [backendError, setBackendError] = useState(false);

  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    api: "Healthy",
  });

  const [search, setSearch] = useState("");

  const [predictionFilter, setPredictionFilter] = useState("all");

  const [confidenceFilter, setConfidenceFilter] = useState("all");

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [countdown, setCountdown] = useState(3);

  const [previousLogCount, setPreviousLogCount] = useState(0);

  const [backendConnected, setBackendConnected] = useState(true);

  const loadingBar = useRef(null);

  // ==========================================
  // Fetch Dashboard Data
  // ==========================================

  const fetchLogs = async (showToast = false) => {
    loadingBar.current?.continuousStart();

    try {
      setLoading(true);

      const [logsResponse, metricsResponse] = await Promise.all([
        api.get("/logs"),
        api.get("/system-metrics"),
      ]);

      const newLogs = logsResponse.data;

      setLogs(newLogs);

      setBackendError(false);

      // ==========================
      // New Prediction Detection
      // ==========================

      if (
        previousLogCount > 0 &&
        newLogs.length > previousLogCount
      ) {

        const latest =
          newLogs[newLogs.length - 1];

        if (latest.label === "Fraud") {

          toast.error(
            `🚨 Fraud Detected\nConfidence: ${(
              Number(latest.confidence) * 100
            ).toFixed(1)}%`,
            {
              autoClose: 5000,
            }
          );

        }

        if (Number(latest.latency) > 200) {

          toast.warning(
            `⚠ High Latency\n${Number(
              latest.latency
            ).toFixed(1)} ms`,
            {
              autoClose: 4000,
            }
          );

        }

      }

      setPreviousLogCount(newLogs.length);

      if (!backendConnected) {

        toast.success(
          "🟢 Backend connection restored"
        );

        setBackendConnected(true);

      }

      setSystemMetrics(metricsResponse.data);
      setLastUpdated(new Date());
      setCountdown(3);

      if (showToast) {
        toast.success("Dashboard refreshed");
      }
    } catch (err) {

      console.error(err);

      setBackendError(true);

      if (backendConnected) {

        toast.error(
          "🔴 Backend disconnected",
          {
            autoClose: 5000,
          }
        );

        setBackendConnected(false);

      }

    } finally {
      setLoading(false);
      loadingBar.current?.complete();
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    fetchLogs(false);

    const refreshTimer = setInterval(() => {
      fetchLogs(false);
    }, 3000);

    return () => clearInterval(refreshTimer);
  }, []);

  // ==========================================
  // Countdown
  // ==========================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 3 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // Apply Filters
  // ==========================================

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      search === "" || log.id?.toString().includes(search);

    let matchesPrediction = true;

    if (predictionFilter === "fraud") {
      matchesPrediction = log.label === "Fraud";
    }

    if (predictionFilter === "normal") {
      matchesPrediction = log.label === "Normal";
    }

    const confidence = Number(log.confidence) * 100;

    let matchesConfidence = true;

    if (confidenceFilter === "high") {
      matchesConfidence = confidence > 90;
    }

    if (confidenceFilter === "medium") {
      matchesConfidence = confidence >= 50 && confidence <= 90;
    }

    if (confidenceFilter === "low") {
      matchesConfidence = confidence < 50;
    }

    return matchesSearch && matchesPrediction && matchesConfidence;
  });

  // ==========================================
  // Quick Actions
  // ==========================================

  const refreshDashboard = () => {
    fetchLogs(true);
  };

  const clearFilters = () => {
    setSearch("");
    setPredictionFilter("all");
    setConfidenceFilter("all");
    toast.info("Filters cleared");
  };

  const exportCSV = () => {
    document.querySelector(".export-csv-btn")?.click();
  };

  const exportPDF = () => {
    document.querySelector(".export-pdf-btn")?.click();
  };

  // ==========================================
  // Render Dashboard
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "#ffffff",
      }}
    >
      <LoadingBar
        color="#3B82F6"
        ref={loadingBar}
        height={3}
        shadow={true}
      />

      <Navbar />

      {backendError ? (

        <BackendError
          onRetry={() => fetchLogs(true)}
        />

      ) : (

      <div
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
          padding: "30px",
        }}
      >
        {/* ==========================================
            Live Status Bar
        ========================================== */}

        <LiveStatusBar
          backendConnected={backendConnected}
          lastUpdated={lastUpdated}
          countdown={countdown}
        />

        {/* ==========================================
            Enterprise Header
        ========================================== */}

        <DashboardHeader
          totalPredictions={filteredLogs.length}
          lastUpdated={lastUpdated}
        />

        {/* ==========================================
            KPI Cards
        ========================================== */}

        <StatsCards logs={filteredLogs} />

        {/* ==========================================
            System Metrics
        ========================================== */}

        <div style={{ marginTop: "25px" }}>
          <SystemMetrics metrics={systemMetrics} />
        </div>

        {/* ==========================================
            Filters
        ========================================== */}

        <div style={{ marginTop: "25px" }}>
          <FilterBar
            search={search}
            setSearch={setSearch}
            predictionFilter={predictionFilter}
            setPredictionFilter={setPredictionFilter}
            confidenceFilter={confidenceFilter}
            setConfidenceFilter={setConfidenceFilter}
          />
        </div>

        {/* ==========================================
            Refresh Status
        ========================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          <div>
            <div
              style={{
                color: "#94A3B8",
                fontSize: "13px",
              }}
            >
              Last Updated
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              {lastUpdated.toLocaleTimeString()}
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                color: "#94A3B8",
                fontSize: "13px",
              }}
            >
              Next Refresh
            </div>

            <div
              style={{
                color: "#22C55E",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {countdown}s
            </div>
          </div>
        </div>

        {/* ==========================================
            Export Buttons
        ========================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <ExportCSV className="export-csv-btn" logs={filteredLogs} />

          <ExportPDF className="export-pdf-btn" logs={filteredLogs} />
        </div>

        {/* ==========================================
            Charts
        ========================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
            marginBottom: "30px",
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>

            <LatencyChart logs={filteredLogs} />

            <PredictionPieChart logs={filteredLogs} />

          </Suspense>
        </div>

        {/* ==========================================
            Main Dashboard Grid
        ========================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 3fr) minmax(360px, 1.2fr)",
            gap: "25px",
            alignItems: "start",
          }}
        >
          {/* ==========================================
              Left Section
          ========================================== */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>

              <PredictionTable logs={filteredLogs} loading={loading} />

              <ModelPerformance logs={filteredLogs} />

            </Suspense>
          </div>

          {/* ==========================================
              Right Sidebar
          ========================================== */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              position: "sticky",
              top: "20px",
            }}
          >
            <AlertsPanel logs={filteredLogs} />

            <AIModelHealth logs={filteredLogs} />

            <SystemInfo metrics={systemMetrics} />

            <ActivityFeed logs={filteredLogs} />

            <QuickActions
              onRefresh={refreshDashboard}
              onExportCSV={exportCSV}
              onExportPDF={exportPDF}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>

      )}
    </div>
  );
}

export default Dashboard;