// import { useState, useEffect } from "react";

// const QuizPage = () => {
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [answers, setAnswers] = useState<string[]>(Array(8).fill(""));
//   const [loading, setLoading] = useState(true);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     fetchQuestion();
//   }, []);

//   const fetchQuestion = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify({ message: "Give me a beginner web dev quiz question." }),
//         body: JSON.stringify({
//           message: `Make an 8 question quiz (short answer) for a beginner web developer studying for their technical interview. Please only present one question at a time. Use the following categories of developement when writing the questions: please provide 2 questions per category. text only, no tables or images.
//           HTML & CSS: Structure and styling basics.
//           JavaScript: Client-side scripting and basic functions.
//           Backend & Databases: Introduction to server-side logic and database interactions.
//           Version Control & Deployment: Basic Git commands and web deployment.again, only display 1/8 at a time. do not return more than one question..`
//         }),
//       });

//       const data = await response.json();
//       if (data.reply) {
//         setQuestions([data.reply]); // Storing the first question
//       }
//     } catch (error) {
//       console.error("Error fetching question:", error);
//     }
//     setLoading(false);
//   };

//   const handleNext = async () => {
//     if (currentQuestion < 7) {
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       // Fetch the next question when reaching the last stored one
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:5000/api/chat", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: "Give me another beginner web dev quiz question." }),
//         });

//         const data = await response.json();
//         if (data.reply) {
//           setQuestions((prev) => [...prev, data.reply]);
//         }
//       } catch (error) {
//         console.error("Error fetching next question:", error);
//       }
//       setLoading(false);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1);
//     }
//   };

//   const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setAnswers((prev) => {
//       const updated = [...prev];
//       updated[currentQuestion] = e.target.value;
//       return updated;
//     });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/submit-quiz", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ answers }),
//       });

//       if (response.ok) {
//         setSubmitted(true);
//       } else {
//         console.error("Failed to submit answers");
//       }
//     } catch (error) {
//       console.error("Error submitting quiz:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border">
//         {loading ? (
//           <div className="flex justify-center text-lg font-semibold">
//             Loading...
//           </div>
//         ) : submitted ? (
//           <h2 className="text-xl font-semibold text-center">
//             Quiz submitted! Thank you for your responses.
//           </h2>
//         ) : (
//           <>
//             {/* Question Box */}
//             <div className="mb-6 p-6 bg-blue-100 border border-blue-500 rounded-md shadow-md">
//               <h2 className="text-lg font-bold text-blue-700 text-center">
//                 Question {currentQuestion + 1} / 8
//               </h2>
//               <p className="text-lg text-gray-800 text-center mt-2">
//                 {questions.length > currentQuestion
//                   ? questions[currentQuestion]
//                   : "Loading question..."}
//               </p>
//             </div>

//             {/* Answer Box */}
//             <div className="mb-6">
//               <label
//                 htmlFor="answer"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Your Answer:
//               </label>
//               <textarea
//                 id="answer"
//                 placeholder="Type your answer here..."
//                 value={answers[currentQuestion]}
//                 onChange={handleAnswerChange}
//                 className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
//                 rows={4}
//               />
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentQuestion === 0}
//                 className={`px-4 py-2 rounded-md ${
//                   currentQuestion === 0
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-gray-500 text-white hover:bg-gray-600"
//                 }`}
//               >
//                 Previous
//               </button>
//               {currentQuestion < 7 ? (
//                 <button
//                   onClick={handleNext}

//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   Submit Answer
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmit}
//                   className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                 >
//                   Submit Quiz
//                 </button>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizPage;

import { useState, useEffect } from "react";

const QuizPage = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(8).fill(""));
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestion(1); // Load first question on mount
  }, []);

  const fetchQuestion = async (questionNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Provide question ${questionNumber} of 8 for a beginner web development quiz, remember not to repeat any questions and to evenly use the following categories: HTML & CSS: Structure and styling basics, JavaScript: Client-side scripting and basic functions, Backend & Databases: Introduction to server-side logic and database interactions, Version Control & Deployment: Basic Git commands and web deployment.Short answer only not multiple choice. do not provide the answer. dont reveal the category in the question. dont reply with the question number.`,
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setQuestions((prev) => [...prev, data.reply]); // Store new question
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  };

  const handleSubmitAnswer = async () => {
    // Store the answer
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = currentAnswer;
      return updated;
    });

    setCurrentAnswer(""); // Reset input

    if (currentIndex < 7) {
      const nextQuestionNumber = currentIndex + 2;
      setCurrentIndex((prev) => prev + 1);
      await fetchQuestion(nextQuestionNumber); // Fetch next question
    } else {
      await submitQuizForGrading();
    }
  };

  const submitQuizForGrading = async () => {
    setLoading(true);

    // Format the questions and answers for grading
    let quizContent = "";
    questions.forEach((qText, i) => {
      quizContent += `Q${i + 1}: ${qText}\nA${i + 1}: ${answers[i]}\n`;
    });

    const gradePrompt =
      quizContent +
      "\nCan you grade this quiz and give me a percentage I got correct? Also, which categories should I work on?";

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: gradePrompt }),
      });

      const data = await response.json();
      if (data.reply) {
        setResult(data.reply);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    setLoading(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border">
        {loading ? (
          <div className="flex justify-center text-lg font-semibold">
            Loading...
          </div>
        ) : submitted ? (
          <div className="text-xl font-semibold text-center">
            <h2>Quiz Results</h2>
            <p className="mt-4">{result}</p>
          </div>
        ) : (
          <>
            {/* Question Box */}
            <div className="mb-6 p-6 bg-blue-100 border border-blue-500 rounded-md shadow-md">
              <h2 className="text-lg font-bold text-blue-700 text-center">
                DevCoachPro
              </h2>
              <p className="text-lg text-gray-800 text-center mt-2">
                {questions.length > currentIndex
                  ? questions[currentIndex]
                  : "Loading question..."}
              </p>
            </div>

            {/* Answer Box */}
            <div className="mb-6">
              <label
                htmlFor="answer"
                className="block text-sm font-medium text-gray-700"
              >
                Your Answer:
              </label>
              <textarea
                id="answer"
                placeholder="Type your answer here..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                rows={4}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-md ${
                  currentIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                Previous
              </button>
              {currentIndex < 7 ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={currentAnswer.trim() === ""}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={submitQuizForGrading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Submit Quiz
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
