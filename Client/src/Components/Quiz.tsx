
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

import { useState, useEffect } from "react";

const QuizPage = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(8).fill(""));
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chatgpt-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numQuestions: 8 }),
      });

      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = e.target.value;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentQuestion < 7) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border">
        {loading ? (
          <div className="flex justify-center text-lg font-semibold">Loading...</div>
        ) : submitted ? (
          <h2 className="text-xl font-semibold text-center">
            Quiz submitted! Thank you for your responses.
          </h2>
        ) : (
          <>
            {/* ✅ Question Box - Now with sample text */}
            <div className="mb-6 p-6 bg-blue-100 border border-blue-500 rounded-md shadow-md">
              <h2 className="text-lg font-bold text-blue-700 text-center">
                Question {currentQuestion + 1} / 8
              </h2>
              <p className="text-lg text-gray-800 text-center mt-2">
                {questions.length > 0 ? questions[currentQuestion] : "Sample Question: What is React used for?"}
              </p>
            </div>

            {/* ✅ Answer Box */}
            <div className="mb-6">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                Your Answer:
              </label>
              <textarea
                id="answer"
                placeholder="Type your answer here..."
                value={answers[currentQuestion]}
                onChange={handleAnswerChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                rows={4}
              />
            </div>

            {/* ✅ Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md ${
                  currentQuestion === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                Previous
              </button>
              {currentQuestion < 7 ? (
                <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
