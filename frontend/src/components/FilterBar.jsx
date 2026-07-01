import "./FilterBar.css";
import { FaSearch, FaFilter, FaUndo } from "react-icons/fa";

function FilterBar({
  search,
  setSearch,
  predictionFilter,
  setPredictionFilter,
  confidenceFilter,
  setConfidenceFilter,
}) {
  const resetFilters = () => {
    setSearch("");
    setPredictionFilter("all");
    setConfidenceFilter("all");
  };

  return (
    <div className="filter-container">
      {/* Search */}

      <div className="search-wrapper">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Prediction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Prediction */}

      <div className="filter-group">
        <FaFilter />

        <select
          value={predictionFilter}
          onChange={(e) => setPredictionFilter(e.target.value)}
        >
          <option value="all">All Predictions</option>
          <option value="fraud">Fraud</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Confidence */}

      <div className="filter-group">
        <FaFilter />

        <select
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value)}
        >
          <option value="all">All Confidence</option>
          <option value="high">High (90%+)</option>
          <option value="medium">Medium (50-90%)</option>
          <option value="low">Low (&lt;50%)</option>
        </select>
      </div>

      {/* Reset */}

      <button
        className="reset-btn"
        onClick={resetFilters}
      >
        <FaUndo />

        Reset
      </button>
    </div>
  );
}

export default FilterBar;