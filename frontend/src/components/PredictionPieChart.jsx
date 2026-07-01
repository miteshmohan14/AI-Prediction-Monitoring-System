import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./PredictionPieChart.css";

function PredictionPieChart({ logs }) {
  const fraud = logs.filter((l) => l.prediction === 1).length;
  const normal = logs.filter((l) => l.prediction === 0).length;

  const data = [
    {
      name: "Normal",
      value: normal,
    },
    {
      name: "Fraud",
      value: fraud,
    },
  ];

  const COLORS = ["#00E676", "#FF5252"];

  return (
    <div className="pie-card">
      <h2>Prediction Distribution</h2>

      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Legend />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionPieChart;