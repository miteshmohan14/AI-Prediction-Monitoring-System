import "./FraudTrendChart.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function FraudTrendChart({ logs }) {
  let count = 0;

  const data = logs
    .slice(0, 15)
    .reverse()
    .map((log, index) => {
      if (log.label === "Fraud") count++;

      return {
        name: index + 1,
        fraud: count,
      };
    });

  return (
    <div className="fraud-card">
      <h2>Fraud Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="fraud"
            stroke="#ff5252"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FraudTrendChart;