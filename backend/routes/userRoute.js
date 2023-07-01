const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const utils = require('../utils');

const router = express.Router();

router.post('/signIn', authController.signInUser);
router.post('/signUp', authController.signUpUser);
router.route('/').get(authMiddleware.protectRoute, userController.getAllUsers);
router
	.route('/me')
	.get(authMiddleware.protectRoute, userController.getCurrentUser)
	.patch(authMiddleware.protectRoute, userController.updateCurrentUser)
	.delete(authMiddleware.protectRoute, userController.deleteCurrentUser);
router
	.route('/:id')
	.get(authMiddleware.protectRoute, utils.checkId, userController.getUser)
	.patch(
		authMiddleware.protectRoute,
		authMiddleware.restrictTo(['admin']),
		utils.checkId,
		userController.updateUser
	)
	.delete(
		authMiddleware.protectRoute,
		authMiddleware.restrictTo(['admin']),
		utils.checkId,
		userController.deleteUser
	);

module.exports = router;
