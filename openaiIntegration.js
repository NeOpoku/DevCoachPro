import "dotenv/config";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("✅ OpenAI API Key Loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    store: true,
    messages: [
        {"role": "user", "content": "write a haiku about ai"}
    ]
});


// Test the API connection
getChatGPTResponse("Explain the Big O notation in simple terms.");
