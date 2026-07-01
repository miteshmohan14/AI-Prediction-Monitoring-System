import "./AIModelHealth.css";
import {
  FaCheckCircle,
  FaBrain,
  FaClock,
  FaChartLine,
  FaServer,
} from "react-icons/fa";

function AIModelHealth({ logs }) {

  const total = logs.length;

  const avgLatency =
    total > 0
      ? (
          logs.reduce(
            (sum, log) => sum + Number(log.latency),
            0
          ) / total
        ).toFixed(1)
      : 0;

  const avgConfidence =
    total > 0
      ? (
          logs.reduce(
            (sum, log) => sum + Number(log.confidence),
            0
          ) /
          total *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="health-card">

      <div className="health-header">

        <h2>AI Model Health</h2>

        <FaBrain className="brain-icon" />

      </div>

      <div className="health-status">

        <FaCheckCircle className="online-icon" />

        <div>

          <strong>Online</strong>

          <p>Model is serving predictions</p>

        </div>

      </div>

      <div className="health-grid">

        <div className="health-item">

          <FaBrain />

          <div>

            <span>Model</span>

            <strong>FraudNet v1.3</strong>

          </div>

        </div>

        <div className="health-item">

          <FaChartLine />

          <div>

            <span>Confidence</span>

            <strong>{avgConfidence}%</strong>

          </div>

        </div>

        <div className="health-item">

          <FaClock />

          <div>

            <span>Avg Latency</span>

            <strong>{avgLatency} ms</strong>

          </div>

        </div>

        <div className="health-item">

          <FaServer />

          <div>

            <span>Predictions</span>

            <strong>{total}</strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIModelHealth;