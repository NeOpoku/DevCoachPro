import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Results.css";

const Results: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const score = queryParams.get("score") || "0";
  const navigate = useNavigate();

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      <p className="results-score">Your Score: {score}</p>
      <p className="results-feedback">Keep practicing to improve your skills! 🎯</p>
      <button className="restart-btn" onClick={() => navigate("/")}>Restart</button>
    </div>
  );
};

export default Results;
