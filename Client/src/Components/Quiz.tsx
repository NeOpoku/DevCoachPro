import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Quiz.css";

const QuizPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const knowledgeLevel = queryParams.get("level") || "Unknown";

  return (
    <div className="knowledge-container">
      <h1>Quiz Page</h1>
      <p>You selected: <strong>{knowledgeLevel}</strong> Level</p>
      <p>🎯 Get ready for some coding challenges!</p>
    </div>
  );
};

export default QuizPage;
