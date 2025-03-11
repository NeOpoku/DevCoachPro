import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const getQuizQuestion = async () => {
  try {
    const prompt = `Make an 8-question quiz (short answer) for a beginner web developer studying for their technical interview. Please only present one question at a time. Use the following categories of development when writing the questions, providing 2 questions per category:

    - HTML & CSS – Structure and styling basics.
    - JavaScript – Client-side scripting and basic functions.
    - Backend & Databases – Introduction to server-side logic and database interactions.
    - Version Control & Deployment – Basic Git commands and web deployment.

    Please respond with only one question at a time in plain text. No tables or images.`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4",  // Or "gpt-3.5-turbo"
        messages: [{ role: "system", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Error: Unable to generate quiz question.";
  }
};
