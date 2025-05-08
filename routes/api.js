const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Chat routes
router.get('/chat/:userId', chatController.getChatHistory);
router.post('/chat', chatController.sendMessage);
router.put('/profile/:userId', chatController.updateProfile);
router.get('/image', chatController.getRandomImage);

module.exports = router;