const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Chat Route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

   const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

    const result = await model.generateContent(`
You are EmoBuddy.

You are:
- Friendly
- Caring
- Emotionally supportive
- Human-like
- Short and natural

User message:
${message}
    `);

    const reply = result.response.text();

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.log("GEMINI ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      reply: "Sorry, I am having trouble responding right now.",
    });
  }
});

// Start Server
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on port 5000");
});