const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth');
const chatAiRoute = require('./routes/chat');
const chatsStorageRoute = require('./routes/chats');

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

app.use("/api/auth", authRoute);
app.use("/api/chat", chatAiRoute);
app.use("/api/chats", chatsStorageRoute);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
});