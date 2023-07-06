const Chat = require('../models/Chat');
const Message = require('../models/Message');
const utils = require('../utils');
const { catchAsync } = require('../utils');
const AppError = require('../utils/appError');

exports.getAllMessages = catchAsync(async (req, res) => {
	const messages = await Message.find({ chat: req.params.chatId });

	res.status(200).json({
		status: 'success',
		results: messages.length,
		data: {
			messages,
		},
	});
});

exports.createMessage = catchAsync(async (req, res, next) => {
	const reqBodyData = {};
	reqBodyData.sender = req.user._id;
	reqBodyData.chat = req.params.chatId;
	reqBodyData.text = req.body.text;

	const chat = await Chat.findById(req.params.chatId);
	const newMessage = await Message.create(reqBodyData);

	chat.messages.push(newMessage._id);

	await chat.save();

	res.status(200).json({
		status: 'success',
		data: {
			message: newMessage,
		},
	});
});

exports.updateMessage = catchAsync(async (req, res, next) => {
	const message = await Message.findById(req.params.id);
	const reqBodyData = {};

	reqBodyData.text = req.body.text;
	reqBodyData.lastUpdatedAt = Date.now();

	if (req.user._id.toString() !== message.sender.toString()) {
		return next(new AppError('Credentials Denied!', 401));
	}

	const newMessage = await Message.findByIdAndUpdate(
		req.params.id,
		reqBodyData,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			message: newMessage,
		},
	});
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
	const message = await Message.findById(req.params.id);

	if (!message) {
		return next(new AppError('Message Not Found!', 404));
	}

	if (req.user._id.toString() !== message.sender.toString()) {
		return next(new AppError('Credentials Denied!', 401));
	}

	const chat = await Chat.findById(message.chat);

	const messageIndex = utils.findInArray({
		array: chat.messages,
		itemToFind: req.params.id,
	});

	if (messageIndex < 0) {
		return next(new AppError('Message Not Found!', 404));
	}

	chat.messages.splice(messageIndex, 1);

	await chat.save();
	await Message.findByIdAndRemove(req.params.id);

	res.status(204).json({
		status: 'success',
	});
});
