import { saveAs } from "file-saver";

// ============================================
// Reusable CSV Export Function
// ============================================

export const exportLogsToCSV = (logs) => {
  if (!logs || logs.length === 0) {
    alert("No logs available.");
    return;
  }

  const headers = [
    "ID",
    "Prediction",
    "Label",
    "Confidence",
    "Latency",
    "Amount",
    "Timestamp",
  ];

  const rows = logs.map((log) => [
    log.id,
    log.prediction,
    log.label,
    log.confidence,
    log.latency,
    log.amount,
    log.timestamp,
  ]);

  const csv =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "prediction_logs.csv");
};

// ============================================
// Button Component
// ============================================

function ExportCSV({ logs }) {
  return (
    <button
      onClick={() => exportLogsToCSV(logs)}
      style={{
        background: "#00b894",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      📤 Export CSV
    </button>
  );
}

export default ExportCSV;