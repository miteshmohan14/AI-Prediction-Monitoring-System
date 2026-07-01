import "./QuickActions.css";
import {
  FaSyncAlt,
  FaFilePdf,
  FaFileCsv,
  FaFilter,
} from "react-icons/fa";

function QuickActions({
  onRefresh,
  onExportPDF,
  onExportCSV,
  onClearFilters,
}) {
  return (
    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <button
        className="action-btn"
        onClick={onRefresh}
      >
        <FaSyncAlt />
        Refresh Dashboard
      </button>

      <button
        className="action-btn"
        onClick={onExportPDF}
      >
        <FaFilePdf />
        Export PDF Report
      </button>

      <button
        className="action-btn"
        onClick={onExportCSV}
      >
        <FaFileCsv />
        Export CSV
      </button>

      <button
        className="action-btn"
        onClick={onClearFilters}
      >
        <FaFilter />
        Clear Filters
      </button>

    </div>
  );
}

export default QuickActions;