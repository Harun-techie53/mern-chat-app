const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protectRoute } = require('../middlewares/authMiddleware');

router
	.route('/:chatId')
	.get(protectRoute, messageController.getAllMessages)
	.post(protectRoute, messageController.createMessage);

router
	.route('/:id')
	.patch(protectRoute, messageController.updateMessage)
	.delete(protectRoute, messageController.deleteMessage);

module.exports = router;
