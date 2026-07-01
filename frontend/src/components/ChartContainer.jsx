import "./ChartContainer.css";

function ChartContainer({
  title,
  subtitle,
  children
}) {
  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h2>{title}</h2>

          <p>{subtitle}</p>

        </div>

      </div>

      <div className="chart-body">

        {children}

      </div>

    </div>
  );
}

export default ChartContainer;