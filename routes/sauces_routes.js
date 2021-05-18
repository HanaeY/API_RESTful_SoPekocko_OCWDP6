const express = require('express');
const router = express.Router(); // création d'un routeur express

// import des middlewares 
const sauceCtrl = require('../controllers/sauces_ctrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// détail des routes pour les requêtes envoyées à '/api/auth' + extension URI
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeASauce);

module.exports = router; // export du routeur qui sera importé dans le fichier app.js
