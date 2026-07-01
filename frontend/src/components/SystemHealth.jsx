import "./SystemHealth.css";

function SystemHealth({ logs }) {
  const avgLatency =
    logs.length > 0
      ? (
          logs.reduce(
            (sum, log) => sum + Number(log.latency),
            0
          ) / logs.length
        ).toFixed(1)
      : 0;

  return (
    <div className="health-card">
      <h2>System Health</h2>

      <div className="health-row">
        <span>Backend</span>
        <span className="green">● Online</span>
      </div>

      <div className="health-row">
        <span>Database</span>
        <span className="green">● Connected</span>
      </div>

      <div className="health-row">
        <span>Model</span>
        <span className="green">● Loaded</span>
      </div>

      <div className="health-row">
        <span>Average Latency</span>
        <span>{avgLatency} ms</span>
      </div>

      <div className="health-row">
        <span>Total Predictions</span>
        <span>{logs.length}</span>
      </div>
    </div>
  );
}

export default SystemHealth;