import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "./ConfidenceChart.css";

function ConfidenceChart({ logs }) {

  const data = [...logs]
    .reverse()
    .slice(-15)
    .map((log) => ({
      time: new Date(log.timestamp).toLocaleTimeString(),
      confidence: Number(log.confidence),
    }));

  return (
    <div className="confidence-card">

      <h2>Confidence Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>

          <CartesianGrid stroke="#333"/>

          <XAxis
            dataKey="time"
            tick={{fill:"#aaa"}}
          />

          <YAxis
            domain={[0,1]}
            tick={{fill:"#aaa"}}
          />

          <Tooltip/>

          <Area
            type="monotone"
            dataKey="confidence"
            stroke="#00E5FF"
            fill="#00E5FF55"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ConfidenceChart;