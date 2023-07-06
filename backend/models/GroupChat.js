const mongoose = require('mongoose');
const validator = require('validator');

const groupChatSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!'],
		unique: true,
	},
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }],
	admin: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupMessage' }],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = GroupChat = new mongoose.model('GroupChat', groupChatSchema);
