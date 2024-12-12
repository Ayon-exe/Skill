import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Import CORS middleware
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API key is missing. Check your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Root route for debugging
app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/prompt for POST requests.");
});

// API endpoint to handle prompt
app.post("/api/prompt", async (req, res) => {
  const { skill } = req.body;

  if (!skill) {
    return res.status(400).json({ error: "Skill name is required" });
  }

  // Fixed prompt structure
  const prompt = `Generate a detailed and hierarchical learning path for the skill '${skill}', organized as a tree structure with key concepts, subtopics, and actionable steps.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // Directly retrieve the text response from the result
    const text = result.response?.text || "No content generated"; // Ensure safety in case of an unexpected response structure

    res.json({ text });
  } catch (error) {
    console.error("Error generating content:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
