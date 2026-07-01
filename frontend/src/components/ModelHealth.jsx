import "./ModelHealth.css";

function ModelHealth() {
  const metrics = [
    { title: "Model", value: "Random Forest" },
    { title: "Version", value: "v1.0.0" },
    { title: "Features", value: "30" },
    { title: "Accuracy", value: "99.96%" },
    { title: "Precision", value: "94.12%" },
    { title: "Recall", value: "81.63%" },
    { title: "ROC-AUC", value: "96.30%" },
    { title: "Status", value: "🟢 Healthy" },
  ];

  return (
    <div className="model-health-card">
      <h2>🤖 Model Health</h2>

      <div className="model-grid">
        {metrics.map((metric, index) => (
          <div className="metric-box" key={index}>
            <span className="metric-title">{metric.title}</span>
            <span className="metric-value">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelHealth;