const { catchAsync } = require('../utils');
const GroupChat = require('../models/GroupChat');

exports.getAllGroupChats = catchAsync(async (req, res) => {
	const groupChats = await GroupChat.find();

	res.status(200).json({
		status: 'success',
		data: {
			groupChats,
		},
	});
});

exports.createGroupChat = catchAsync(async (req, res) => {
	const newGroupChat = new GroupChat({
		name: req.body.name,
		users: [req.user._id],
		admin: req.user._id,
		messages: [],
	});

	await newGroupChat.save();

	res.status(201).json({
		status: 'success',
		data: {
			groupChat: newGroupChat,
		},
	});
});
