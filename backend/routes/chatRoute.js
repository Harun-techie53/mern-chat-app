const express = require('express');
const { protectRoute } = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chatController');
const router = express.Router();

router
	.route('/')
	.get(protectRoute, chatController.getAllChats)
	.post(protectRoute, chatController.createChat);

router
	.route('/:chatId')
	.patch(protectRoute, chatController.updateChat)
	.delete(protectRoute, chatController.deleteChat);

router
	.route('/:chatId/user/:userId')
	.patch(protectRoute, chatController.removeUserFromChat);

module.exports = router;
