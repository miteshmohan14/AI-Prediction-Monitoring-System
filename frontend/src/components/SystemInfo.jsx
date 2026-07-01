import "./SystemInfo.css";
import {
  FaServer,
  FaDatabase,
  FaWifi,
  FaMicrochip,
  FaMemory,
  FaHdd,
} from "react-icons/fa";

function SystemInfo({ metrics }) {

  return (
    <div className="system-info-card">

      <div className="system-info-header">

        <h2>System Information</h2>

        <FaServer />

      </div>

      <div className="system-info-list">

        <div className="system-row">
          <FaServer className="icon" />
          <span>API Server</span>
          <strong className="healthy">Healthy</strong>
        </div>

        <div className="system-row">
          <FaDatabase className="icon" />
          <span>Database</span>
          <strong className="healthy">Connected</strong>
        </div>

        <div className="system-row">
          <FaWifi className="icon" />
          <span>WebSocket</span>
          <strong className="healthy">Connected</strong>
        </div>

        <div className="system-row">
          <FaMicrochip className="icon" />
          <span>CPU</span>
          <strong>{metrics.cpu}%</strong>
        </div>

        <div className="system-row">
          <FaMemory className="icon" />
          <span>Memory</span>
          <strong>{metrics.memory}%</strong>
        </div>

        <div className="system-row">
          <FaHdd className="icon" />
          <span>Disk</span>
          <strong>{metrics.disk}%</strong>
        </div>

      </div>

    </div>
  );
}

export default SystemInfo;