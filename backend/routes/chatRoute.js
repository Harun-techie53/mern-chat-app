const express = require('express');
const { protectRoute } = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chatController');
const router = express.Router();

router
	.route('/group-chat')
	.get(protectRoute, chatController.getAllGroupChats)
	.post(protectRoute, chatController.createGroupChat);

module.exports = router;
