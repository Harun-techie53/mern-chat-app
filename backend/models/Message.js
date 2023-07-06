const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	sender: { type: Schema.Types.ObjectId, ref: 'userModel' },
	chat: { type: Schema.Types.ObjectId, ref: 'userModel' },
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

module.exports = GroupMessage = new mongoose.model('Message', messageSchema);
