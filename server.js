import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




app.get("/image", async (req, res) => {
  const { prompt } = req.query;
         console.log(prompt);
         
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    // URL encode the prompt
    let encodedPrompt = encodeURIComponent(prompt);
        encodedPrompt=encodedPrompt+` ${Math.floor(Math.random()*10000)}`
    // Pollinations free image generation endpoint
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    // Send JSON with image URL to frontend
    res.json({ image: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});













app.post("/Chat", async (req, res) => {
  try {
    const inp = req.body.inp;
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [{ parts: [{ text: inp }] }],
      }
    );
    res.json(resp.data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat request failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 3000}`);
});
