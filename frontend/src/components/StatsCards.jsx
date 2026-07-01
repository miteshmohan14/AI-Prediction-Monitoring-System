import "./StatsCards.css";
import CountUp from "react-countup";

import {
  FaDatabase,
  FaExclamationTriangle,
  FaChartLine,
  FaBolt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function StatsCards({ logs }) {
  // ===========================
  // Statistics
  // ===========================

  const totalPredictions = logs.length;

  const fraudCount = logs.filter(
    (log) => log.label === "Fraud"
  ).length;

  const avgConfidence =
    totalPredictions > 0
      ? (
          logs.reduce(
            (sum, log) =>
              sum + Number(log.confidence),
            0
          ) / totalPredictions
        ) * 100
      : 0;

  const avgLatency =
    totalPredictions > 0
      ? logs.reduce(
          (sum, log) =>
            sum + Number(log.latency),
          0
        ) / totalPredictions
      : 0;

  // ===========================
  // Card Data
  // ===========================

  const cards = [
    {
      title: "Total Predictions",
      value: totalPredictions,
      icon: <FaDatabase />,
      color: "#3B82F6",
      trend: "+12%",
      up: true,
    },
    {
      title: "Fraud Detected",
      value: fraudCount,
      icon: <FaExclamationTriangle />,
      color: "#EF4444",
      trend: fraudCount > 0 ? "+5%" : "0%",
      up: fraudCount > 0,
    },
    {
      title: "Avg Confidence",
      value: avgConfidence,
      suffix: "%",
      icon: <FaChartLine />,
      color: "#22C55E",
      trend: "+2%",
      up: true,
    },
    {
      title: "Avg Latency",
      value: avgLatency,
      suffix: " ms",
      icon: <FaBolt />,
      color: "#F59E0B",
      trend: "-6%",
      up: false,
    },
  ];

  // ===========================
  // Render
  // ===========================

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className="stat-card"
          style={{
            borderTop: `4px solid ${card.color}`,
          }}
        >
          {/* Icon */}

          <div
            className="stat-icon"
            style={{
              background: card.color,
            }}
          >
            {card.icon}
          </div>

          {/* Content */}

          <div className="stat-content">

            <h4>{card.title}</h4>

            <h2>

              <CountUp

                end={Number(card.value)}

                duration={1.2}

                decimals={
                  Number(card.value) % 1 !== 0
                    ? 1
                    : 0
                }

                separator=","

                suffix={card.suffix || ""}

              />

            </h2>

            <div
              className={
                card.up
                  ? "trend positive"
                  : "trend negative"
              }
            >
              {card.up ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}

              {card.trend}

              <span>
                vs last refresh
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;