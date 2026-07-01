import "./BackendError.css";
import {
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";

function BackendError({ onRetry }) {
  return (
    <div className="backend-error">

      <FaExclamationTriangle
        className="backend-icon"
      />

      <h1>Backend Unavailable</h1>

      <p>

        Unable to connect to the AI Prediction API.

      </p>

      <p>

        Please ensure the FastAPI server is running.

      </p>

      <button
        onClick={onRetry}
      >
        <FaRedo />

        Retry Connection

      </button>

    </div>
  );
}

export default BackendError;