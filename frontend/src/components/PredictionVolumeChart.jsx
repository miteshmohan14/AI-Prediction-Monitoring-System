import "./PredictionVolumeChart.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function PredictionVolumeChart({ logs }) {
  const data = logs
    .slice(0, 15)
    .reverse()
    .map((log, index) => ({
      name: index + 1,
      predictions: index + 1,
    }));

  return (
    <div className="volume-card">
      <h2>Prediction Volume</h2>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="predictions"
            stroke="#00E676"
            fill="#00E67655"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionVolumeChart;