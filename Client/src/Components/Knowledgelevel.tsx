import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Knowledgelevel.css";

const KnowledgeLevel: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle selection
  const handleSelect = (level: string) => {
    setSelectedLevel(level);
  };

  // Navigate to Quiz Page with selected level
  const startQuiz = () => {
    if (selectedLevel) {
      navigate(`/quiz?level=${selectedLevel}`);
    } else {
      alert("Please select a knowledge level to continue.");
    }
  };

  return (
    <div className="knowledge-container">
      <h1>Select Your Knowledge Level</h1>
      <div className="level-options">
        <button
          className={`level-btn ${selectedLevel === "Beginner" ? "selected" : ""}`}
          onClick={() => handleSelect("Beginner")}
        >
          Beginner
        </button>
        <button
          className={`level-btn ${selectedLevel === "Intermediate" ? "selected" : ""}`}
          onClick={() => handleSelect("Intermediate")}
        >
          Intermediate
        </button>
        <button
          className={`level-btn ${selectedLevel === "Advanced" ? "selected" : ""}`}
          onClick={() => handleSelect("Advanced")}
        >
          Advanced
        </button>
      </div>
      <button className="start-quiz-btn" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default KnowledgeLevel;
