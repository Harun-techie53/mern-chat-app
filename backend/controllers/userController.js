const { isValidObjectId } = require('mongoose');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils');

exports.getAllUsers = catchAsync(async (req, res) => {
	// const requestedQuery = {
	// 	$or: [
	// 		{ name: { $regex: queryKeyword.name ?? '', $options: 'i' } },
	// 		{ email: { $regex: queryKeyword.email ?? '', $options: 'i' } },
	// 	],
	// };

	const users = await userModel
		.find({ _id: { $ne: req.user._id } })
		.select('-password -__v');
	res.status(200).json({
		status: 'success',
		data: {
			users,
		},
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await userModel.findById(req.params.id).select('-password -__v');

	if (!user) next(new AppError('User not found!', 404));

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.getCurrentUser = catchAsync(async (req, res) => {
	const user = await userModel.findById(req.user._id).select('-password -__v');

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

const filteredFields = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.updateCurrentUser = catchAsync(async (req, res) => {
	const reqBodyData = filteredFields(req.body, 'name', 'email').select(
		'-password -__v'
	);

	const user = await userModel.findByIdAndUpdate(req.user._id, reqBodyData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.updateUser = catchAsync(async (req, res) => {
	const reqBodyData = filteredFields(req.body, 'name', 'email').select(
		'-password -__v'
	);

	const user = await userModel.findByIdAndUpdate(req.params.id, reqBodyData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.deleteCurrentUser = catchAsync(async (req, res) => {
	await userModel.findByIdAndDelete(req.user._id);

	res.status(204).json({
		status: 'success',
	});
});

exports.deleteUser = catchAsync(async (req, res) => {
	await userModel.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
	});
});
