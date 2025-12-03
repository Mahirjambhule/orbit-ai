const router = require('express').Router();
const Chat = require('../models/Chat');

// 1. CREATE NEW CHAT
router.post('/new', async (req, res) => {
    const newChat = new Chat({
        userId: req.body.userId,
        title: req.body.title || "New Chat",
        messages: []
    });

    try {
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET USER CHATS
router.get('/user/:userId', async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.params.userId }).sort({ updatedAt: -1 });
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. GET SPECIFIC CHAT
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. ADD MESSAGE TO CHAT
router.put('/:id', async (req, res) => {
    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            {
                $push: { messages: req.body.messages },
                $set: { updatedAt: Date.now() }
            },
            { new: true }
        );
        res.status(200).json(updatedChat);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 5. DELETE CHAT
router.delete('/:id', async (req, res) => {
    try {
        await Chat.findByIdAndDelete(req.params.id);
        res.status(200).json("Chat has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;