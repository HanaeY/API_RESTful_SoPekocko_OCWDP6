const express = require('express');
const router = express.Router(); // création d'un routeur express

// import des middlewares 
const validators = require('../middleware/input_validators');
const userCtrl = require('../controllers/user_ctrl');

// détail des routes pour les requêtes envoyées à '/api/sauces' + extension URI
router.post('/signup', validators.validateEmail, validators.validatePassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; // export du routeur qui sera importé dans le fichier app.js