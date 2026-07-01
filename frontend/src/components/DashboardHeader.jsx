import "./DashboardHeader.css";
import {
  FaCircle,
  FaRobot,
  FaDatabase,
  FaClock,
} from "react-icons/fa";

function DashboardHeader({
  totalPredictions,
  lastUpdated,
}) {

  return (

    <div className="dashboard-header">

      <div className="header-left">

        <h1>
          AI Prediction Monitoring Dashboard
        </h1>

        <p>
          Enterprise Fraud Detection & Monitoring Platform
        </p>

      </div>

      <div className="header-right">

        <div className="header-card">

          <FaCircle className="live-icon"/>

          <div>

            <span>Environment</span>

            <strong>Production</strong>

          </div>

        </div>

        <div className="header-card">

          <FaRobot />

          <div>

            <span>Model</span>

            <strong>FraudNet v1.3</strong>

          </div>

        </div>

        <div className="header-card">

          <FaDatabase />

          <div>

            <span>Predictions</span>

            <strong>{totalPredictions}</strong>

          </div>

        </div>

        <div className="header-card">

          <FaClock />

          <div>

            <span>Updated</span>

            <strong>

              {lastUpdated.toLocaleTimeString()}

            </strong>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardHeader;