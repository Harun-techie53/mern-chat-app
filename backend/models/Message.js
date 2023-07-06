const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	sender: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
	chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
	text: {
		type: String,
		required: [true, 'Message text is required!'],
	},
	timestamp: {
		type: Date,
		default: Date.now(),
	},
	lastUpdatedAt: {
		type: Date,
		default: null,
	},
});

module.exports = Message = new mongoose.model('Message', messageSchema);
