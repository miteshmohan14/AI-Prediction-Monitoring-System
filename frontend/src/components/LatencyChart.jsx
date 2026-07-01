import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import "./LatencyChart.css";

function LatencyChart({ logs }) {
  const data = [...logs]
    .reverse()
    .slice(-15)
    .map((log) => ({
      time: new Date(log.timestamp).toLocaleTimeString(),
      latency: Number(log.latency),
    }));

  return (
    <div className="chart-container">
      <h2>Latency Trend</h2>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>
          <CartesianGrid stroke="#333" />

          <XAxis
            dataKey="time"
            tick={{ fill: "#aaa", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#aaa", fontSize: 12 }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="latency"
            stroke="#00E5FF"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LatencyChart;