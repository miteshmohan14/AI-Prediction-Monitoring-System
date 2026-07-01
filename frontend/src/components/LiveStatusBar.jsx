import "./LiveStatusBar.css";

import {
  FaCircle,
  FaServer,
  FaClock,
  FaSyncAlt,
} from "react-icons/fa";

function LiveStatusBar({
  backendConnected,
  lastUpdated,
  countdown,
}) {
  return (
    <div className="live-status-bar">

      <div className="status-item">

        <FaCircle
          className={
            backendConnected
              ? "live-green"
              : "live-red"
          }
        />

        <span>
          {backendConnected
            ? "LIVE"
            : "OFFLINE"}
        </span>

      </div>

      <div className="status-item">

        <FaServer />

        <span>
          Backend {backendConnected
            ? "Connected"
            : "Disconnected"}
        </span>

      </div>

      <div className="status-item">

        <FaSyncAlt />

        <span>
          Refresh in {countdown}s
        </span>

      </div>

      <div className="status-item">

        <FaClock />

        <span>
          {lastUpdated.toLocaleTimeString()}
        </span>

      </div>

    </div>
  );
}

export default LiveStatusBar;