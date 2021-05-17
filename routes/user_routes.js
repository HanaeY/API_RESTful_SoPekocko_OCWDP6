const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user_ctrl');
const validators = require('../middleware/input_validators');

router.post('/signup', validators.validateEmail, validators.validatePassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;