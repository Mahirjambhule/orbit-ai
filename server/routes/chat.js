const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    const { message, history } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required" });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const formattedHistory = history.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "Failed to generate response", error: error.message });
    }
});

module.exports = router;