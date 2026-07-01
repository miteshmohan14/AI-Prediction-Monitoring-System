import React, { useEffect, useRef, useState } from "react";
import "./ActivityFeed.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
} from "react-icons/fa";

function ActivityFeed({ logs }) {
  const [newPredictionId, setNewPredictionId] = useState(null);

  const previousCount = useRef(logs.length);

  const listRef = useRef(null);

  const timeAgo = (timestamp) => {
    const seconds = Math.floor(
      (Date.now() - new Date(timestamp)) / 1000
    );

    if (seconds < 5) return "Now";

    if (seconds < 60)
      return `${seconds} sec ago`;

    if (seconds < 3600)
      return `${Math.floor(seconds / 60)} min ago`;

    return new Date(timestamp).toLocaleTimeString();
  };

  useEffect(() => {

    if (logs.length > previousCount.current) {

      const latest = logs[logs.length - 1];

      setNewPredictionId(latest.id);

      setTimeout(() => {
        setNewPredictionId(null);
      }, 3000);

      if (listRef.current) {

        listRef.current.scrollTop =
          listRef.current.scrollHeight;

      }

    }

    previousCount.current = logs.length;

  }, [logs]);

  return (
    <div className="activity-feed">

      <div className="activity-title">

        <h2>Live Activity</h2>

        <span className="live-badge">
          LIVE
        </span>

      </div>

      <div
        className="activity-list"
        ref={listRef}
      >

        {[...logs]
          .reverse()
          .slice(0, 12)
          .map((log) => (

            <div
              key={log.id}
              className={`activity-card ${
                newPredictionId === log.id
                  ? "new-activity"
                  : ""
              }`}
            >

              <div className="activity-header">

                <div className="activity-status">

                  {log.label === "Fraud" ? (
                    <FaExclamationTriangle className="fraud-icon" />
                  ) : (
                    <FaCheckCircle className="normal-icon" />
                  )}

                  <strong>
                    {log.label} Prediction
                  </strong>

                  {
                    newPredictionId === log.id && (

                      <span className="new-badge">
                        NEW
                      </span>

                    )
                  }

                </div>

                <span className="time">

                  <FaClock />

                  {timeAgo(log.timestamp)}

                </span>

              </div>

              <div className="activity-body">

                <div>

                  <span>ID</span>

                  <strong>#{log.id}</strong>

                </div>

                <div>

                  <span>Confidence</span>

                  <strong>

                    {(log.confidence * 100).toFixed(1)}%

                  </strong>

                </div>

                <div>

                  <span>Latency</span>

                  <strong>

                    {log.latency.toFixed(1)} ms

                  </strong>

                </div>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

export default ActivityFeed;
