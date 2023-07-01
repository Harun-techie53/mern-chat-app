const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { genCryptoHash } = require('../utils');
const { catchAsync } = require('../utils');

const getJwtToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, res) => {
	const token = getJwtToken(user.id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt', token, cookieOptions);

	//remove password from res body
	user.password = undefined;

	res.status(200).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signUpUser = catchAsync(async (req, res, next) => {
	const { name, email, password, passwordConfirm, photo, role } = req.body;

	const user = new User({
		name,
		email,
		password,
		passwordConfirm,
		photo,
		role,
	});

	await user.save();

	createSendToken(user, res);
});

exports.signInUser = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		const err = new AppError('Please, enter email and password', 400);

		return next(err);
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new AppError('Invalid Credentials!', 401));
	}

	const isPasswordMatch = await user.matchPassword(password, user.password);
	if (!isPasswordMatch) {
		return next(new AppError('Invalid Credentials!', 401));
	}

	createSendToken(user, res);
});
