const { isValidObjectId } = require('mongoose');
const AppError = require('./appError');

class Utils {
	checkId = (req, res, next) => {
		const reqId = req.params.id;

		if (!isValidObjectId(reqId)) {
			return next(
				new AppError(`${req.params.id} is not type of ObjectId!`, 400)
			);
		}

		next();
	};

	findCommonElements = (arr1, arr2) => {
		return arr1?.some((item) => arr2.includes(item));
	};

	findInArray = ({ array, itemToFind, key = '' }) => {
		return array.findIndex((item) =>
			key.trim()
				? item[key].toString() === itemToFind.toString()
				: item.toString() === itemToFind.toString()
		);
	};

	genCryptoHash = (token) => {
		return crypto.createHash('sha256').update(token).digest('hex');
	};

	catchAsync = (fn) => {
		return (req, res, next) => {
			fn(req, res, next).catch(next);
		};
	};
}

module.exports = utils = new Utils();
