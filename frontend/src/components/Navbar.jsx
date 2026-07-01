import "./Navbar.css";
import {
  FaRobot,
  FaCircle
} from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-left">

        <div className="logo-box">
          <FaRobot />
        </div>

        <div>
          <h1>AI Prediction Monitoring System</h1>
          <p>Real-Time AI Model Monitoring Dashboard</p>
        </div>

      </div>

      <div className="navbar-right">

        <div className="live-indicator">
          <FaCircle />
          LIVE
        </div>

        <div className="clock">
          {new Date().toLocaleTimeString()}
        </div>

      </div>

    </header>
  );
}

export default Navbar;