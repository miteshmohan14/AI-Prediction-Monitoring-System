import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import "./PredictionTable.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaTimes,
} from "react-icons/fa";

function PredictionTable({
  logs,
  loading = false,
}) {
  const [search, setSearch] = useState("");

  const [sortField, setSortField] =
    useState("id");

  const [sortDirection, setSortDirection] =
    useState("desc");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [selectedLog, setSelectedLog] =
    useState(null);

  // ===============================
  // Reset Page
  // ===============================

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ===============================
  // Latency Color
  // ===============================

  const latencyClass = (latency) => {
    if (latency < 120) return "good";
    if (latency < 200) return "medium";
    return "bad";
  };

  // ===============================
  // Sorting
  // ===============================

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field)
      return <FaSort />;

    return sortDirection === "asc"
      ? <FaSortUp />
      : <FaSortDown />;
  };

  // ===============================
  // Filter + Sort
  // ===============================

  const filteredLogs = useMemo(() => {
    let data = logs.filter((log) =>
      log.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      let valueA;
      let valueB;

      switch (sortField) {
        case "confidence":
          valueA = Number(a.confidence);
          valueB = Number(b.confidence);
          break;

        case "latency":
          valueA = Number(a.latency);
          valueB = Number(b.latency);
          break;

        case "amount":
          valueA = Number(a.amount);
          valueB = Number(b.amount);
          break;

        case "timestamp":
          valueA = new Date(
            a.timestamp
          ).getTime();

          valueB = new Date(
            b.timestamp
          ).getTime();

          break;

        default:
          valueA = a.id;
          valueB = b.id;
      }

      if (sortDirection === "asc") {
        return valueA > valueB
          ? 1
          : -1;
      }

      return valueA < valueB
        ? 1
        : -1;
    });

    return data;
  }, [
    logs,
    search,
    sortField,
    sortDirection,
  ]);

  // ===============================
  // Pagination
  // ===============================

  const totalPages = Math.ceil(
    filteredLogs.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const endIndex =
    startIndex + rowsPerPage;

  const paginatedLogs =
    filteredLogs.slice(
      startIndex,
      endIndex
    );

  // ===============================
  // Loading State
  // ===============================

  if (loading) {

    return (

      <div style={{ padding: "20px" }}>

        {Array.from({ length: 8 }).map((_, i) => (

          <Skeleton
            key={i}
            height={55}
            style={{
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          />

        ))}

      </div>

    );

  }

  // ===============================
  // UI
  // ===============================

  return (
  <div className="table-card">

      {/* ===========================
          Header
      =========================== */}

      <div className="table-header">

        <div>

          <h2>Recent Predictions</h2>

          <p>
            Showing{" "}
            {filteredLogs.length === 0
              ? 0
              : startIndex + 1}
            {" - "}
            {Math.min(
              endIndex,
              filteredLogs.length
            )}{" "}
            of {filteredLogs.length} predictions
          </p>

        </div>

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search status..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* ===========================
          Table
      =========================== */}

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th
                onClick={() =>
                  handleSort("id")
                }
              >
                ID {getSortIcon("id")}
              </th>

              <th>Prediction</th>

              <th>Status</th>

              <th
                onClick={() =>
                  handleSort("confidence")
                }
              >
                Confidence{" "}
                {getSortIcon("confidence")}
              </th>

              <th
                onClick={() =>
                  handleSort("latency")
                }
              >
                Latency{" "}
                {getSortIcon("latency")}
              </th>

              <th
                onClick={() =>
                  handleSort("amount")
                }
              >
                Amount{" "}
                {getSortIcon("amount")}
              </th>

              <th
                onClick={() =>
                  handleSort("timestamp")
                }
              >
                Time{" "}
                {getSortIcon("timestamp")}
              </th>

            </tr>

          </thead>

          <tbody>

            {paginatedLogs.length === 0 ? (

              <tr>

                <td colSpan="7">

                  <div className="empty-state">

                    <div className="empty-icon">

                      📭

                    </div>

                    <h2>No Predictions Found</h2>

                    <p>

                      Waiting for the AI model to generate predictions...

                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              paginatedLogs.map((log) => (

                <tr
                  key={log.id}
                  className="clickable-row"
                  onClick={() =>
                    setSelectedLog(log)
                  }
                >

                  <td>{log.id}</td>

                  <td>{log.prediction}</td>

                  <td>

                    <span
                      className={
                        log.label === "Fraud"
                          ? "badge fraud"
                          : "badge normal"
                      }
                    >
                      {log.label}
                    </span>

                  </td>

                  <td>

                    <div className="progress">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${
                            Number(
                              log.confidence
                            ) * 100
                          }%`,
                        }}
                      />

                    </div>

                    {(
                      Number(
                        log.confidence
                      ) * 100
                    ).toFixed(1)}
                    %

                  </td>

                  <td
                    className={latencyClass(
                      log.latency
                    )}
                  >
                    {log.latency.toFixed(1)} ms
                  </td>

                  <td>
                    ₹{log.amount}
                  </td>

                  <td>
                    {new Date(
                      log.timestamp
                    ).toLocaleTimeString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ===========================
          Pagination
      =========================== */}

      <div className="pagination">

        <div className="rows-select">

          <span>Rows</span>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(
                Number(e.target.value)
              );

              setCurrentPage(1);
            }}
          >

            <option value={10}>
              10
            </option>

            <option value={20}>
              20
            </option>

            <option value={30}>
              30
            </option>

            <option value={50}>
              50
            </option>

          </select>

        </div>

        <div className="page-buttons">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          {[...Array(totalPages)].map(
            (_, index) => (

              <button
                key={index}
                className={
                  currentPage ===
                  index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>

            )
          )}

          <button
            disabled={
              currentPage ===
                totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>

        </div>

      </div>
            {/* ===========================
          Prediction Details Modal
      =========================== */}

      {selectedLog && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedLog(null)}
        >

          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <h2>Prediction Details</h2>

              <button
                onClick={() => setSelectedLog(null)}
              >
                <FaTimes />
              </button>

            </div>

            <div className="detail-grid">

              <div>

                <strong>ID</strong>

                <p>{selectedLog.id}</p>

              </div>

              <div>

                <strong>Status</strong>

                <p>

                  <span
                    className={
                      selectedLog.label === "Fraud"
                        ? "badge fraud"
                        : "badge normal"
                    }
                  >
                    {selectedLog.label}
                  </span>

                </p>

              </div>

              <div>

                <strong>Prediction</strong>

                <p>{selectedLog.prediction}</p>

              </div>

              <div>

                <strong>Confidence</strong>

                <p>
                  {(Number(selectedLog.confidence) * 100).toFixed(2)}%
                </p>

              </div>

              <div>

                <strong>Latency</strong>

                <p>{selectedLog.latency.toFixed(2)} ms</p>

              </div>

              <div>

                <strong>Amount</strong>

                <p>₹{selectedLog.amount}</p>

              </div>

              <div>

                <strong>Timestamp</strong>

                <p>
                  {new Date(
                    selectedLog.timestamp
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PredictionTable;