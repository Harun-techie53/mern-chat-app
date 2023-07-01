const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { genCryptoHash } = require('../utils');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please, enter a valid email!'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [8, 'Password length must be 8 or more characters!'],
	},
	passwordConfirm: {
		type: String,
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Password didn't match!",
		},
	},
	photo: {
		type: String,
		required: true,
		default:
			'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	joined_At: {
		type: Date,
		default: Date.now(),
	},
});

userSchema.pre('save', async function (next) {
	// if password is not modified then go to next
	if (!this.isModified('password')) return next();

	// if password is modified
	this.password = await bcrypt.hash(this.password, 12);

	//after hashing the password simply delete the confirm password
	this.passwordConfirm = undefined;

	next();
});

userSchema.methods.matchPassword = async function matchPassword(
	candidatePassword,
	userPassword
) {
	const isMatch = await bcrypt.compare(candidatePassword, userPassword);
	return isMatch;
};

// userSchema.pre(/^findById/, function (next) {
// 	this.select('-password -__v');
// 	next();
// });

module.exports = User = new mongoose.model('User', userSchema);
