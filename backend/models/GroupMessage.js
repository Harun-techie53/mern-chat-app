const mongoose = require('mongoose');

const groupMessageSchema = mongoose.Schema({
	senderId: { type: Schema.Types.ObjectId, ref: 'userModel' },
	groupId: { type: Schema.Types.ObjectId, ref: 'userModel' },
	text: {
		type: String,
		required: [true, 'Message text is required!'],
	},
	timestamp: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = GroupMessage = new mongoose.model(
	'GroupMessage',
	groupMessageSchema
);
