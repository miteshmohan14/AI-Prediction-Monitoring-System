import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ============================================
// Reusable PDF Export Function
// ============================================

export const exportLogsToPDF = (logs) => {

  if (!logs || logs.length === 0) {
    alert("No prediction logs available.");
    return;
  }

  const doc = new jsPDF();

  // ==========================================
  // Title
  // ==========================================

  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);

  doc.text(
    "AI Prediction Monitoring System",
    14,
    20
  );

  doc.setFontSize(12);
  doc.setTextColor(120);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    30
  );

  // ==========================================
  // Statistics
  // ==========================================

  const total = logs.length;

  const fraud = logs.filter(
    (log) => log.prediction === 1
  ).length;

  const normal = total - fraud;

  const avgLatency =
    total > 0
      ? (
          logs.reduce(
            (sum, log) =>
              sum + Number(log.latency),
            0
          ) / total
        ).toFixed(2)
      : 0;

  const avgConfidence =
    total > 0
      ? (
          logs.reduce(
            (sum, log) =>
              sum + Number(log.confidence),
            0
          ) /
          total *
          100
        ).toFixed(2)
      : 0;

  doc.setFontSize(16);
  doc.text("Summary", 14, 45);

  doc.setFontSize(12);

  doc.text(
    `Total Predictions : ${total}`,
    20,
    55
  );

  doc.text(
    `Fraud Predictions : ${fraud}`,
    20,
    63
  );

  doc.text(
    `Normal Predictions : ${normal}`,
    20,
    71
  );

  doc.text(
    `Average Confidence : ${avgConfidence}%`,
    20,
    79
  );

  doc.text(
    `Average Latency : ${avgLatency} ms`,
    20,
    87
  );

  // ==========================================
  // Table
  // ==========================================

  const rows = logs.map((log) => [

    log.id,

    log.label,

    `${(
      Number(log.confidence) * 100
    ).toFixed(2)}%`,

    `${Number(log.latency).toFixed(2)} ms`,

    `₹${log.amount}`,

    new Date(
      log.timestamp
    ).toLocaleString(),

  ]);

  autoTable(doc, {

    startY: 95,

    head: [[
      "ID",
      "Prediction",
      "Confidence",
      "Latency",
      "Amount",
      "Timestamp",
    ]],

    body: rows,

    styles: {

      fontSize: 9,

    },

    headStyles: {

      fillColor: [52, 73, 94],

    },

    alternateRowStyles: {

      fillColor: [245, 245, 245],

    },

  });

  // ==========================================
  // Footer
  // ==========================================

  const pages =
    doc.getNumberOfPages();

  for (let i = 1; i <= pages; i++) {

    doc.setPage(i);

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
      `Page ${i} of ${pages}`,
      195,
      290,
      {
        align: "right",
      }
    );

  }

  doc.save(
    "AI_Prediction_Report.pdf"
  );

};

// ============================================
// Button Component
// ============================================

function ExportPDF({ logs }) {

  return (

    <button
      onClick={() => exportLogsToPDF(logs)}
      style={{
        background: "#3498db",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      📄 Export PDF
    </button>

  );

}

export default ExportPDF;