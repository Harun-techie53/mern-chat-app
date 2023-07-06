const { catchAsync } = require('../utils');
const Chat = require('../models/Chat');
const AppError = require('../utils/appError');
const utils = require('../utils');
const userModel = require('../models/userModel');

exports.getAllChats = catchAsync(async (req, res) => {
	const queryKeyword = req.query;
	const chats = await Chat.find(queryKeyword);

	res.status(200).json({
		status: 'success',
		data: {
			chats,
		},
	});
});

exports.createChat = catchAsync(async (req, res) => {
	const newChat = new Chat({
		name: req.body.name,
		users: [req.user._id],
		admin: req.user._id,
		messages: [],
		isGroupChat: req.body.isGroupChat,
	});

	await newChat.save();

	res.status(201).json({
		status: 'success',
		data: {
			chat: newChat,
		},
	});
});

exports.updateChat = catchAsync(async (req, res, next) => {
	const chat = await Chat.findById(req.params.chatId);
	let reqBodyData = {};
	if (req.body.name) {
		reqBodyData.name = req.body.name;
	}

	if (req.body.users) {
		if (typeof req.body?.users !== 'string') {
			return next(new AppError('Users must be in string fromat!', 400));
		}

		const users = req.body.users?.split(',');

		if (utils.findCommonElements(users, chat?.users)) {
			return next(new AppError('User already exist in the chat!', 400));
		}

		reqBodyData.users = [chat.users, ...users];
	}

	if (req.body.admin) {
		reqBodyData.admin = req.body.admin;
	}

	reqBodyData.lastUpdatedAt = Date.now();

	const newChat = await Chat.findByIdAndUpdate(req.params.chatId, reqBodyData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		message: 'Updated Successfully!',
		data: {
			chat: newChat,
		},
	});
});

exports.removeUserFromChat = catchAsync(async (req, res, next) => {
	const chat = await Chat.findById(req.params.chatId);

	const user = req.params.userId;

	if (chat.admin.toString() !== req.user._id.toString()) {
		return next(new AppError('Operation Forbidden!', 403));
	}

	if (user.toString() === req.user._id.toString()) {
		return next(new AppError("Can't perform the operation!", 400));
	}

	const userIndex = utils.findInArray({ array: chat.users, itemToFind: user });

	if (userIndex < 0) {
		return next(new AppError('User not found in the list!', 400));
	}

	chat.users.splice(userIndex, 1);

	await chat.save();

	res.status(200).json({
		status: 'success',
		data: {
			chat,
		},
	});
});
