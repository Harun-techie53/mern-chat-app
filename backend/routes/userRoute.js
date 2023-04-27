const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signIn', authController.signInUser);
router.post('/signUp', authController.signUpUser);

module.exports = router;