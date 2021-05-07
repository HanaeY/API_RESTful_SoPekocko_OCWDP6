const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces_ctrl');
const auth = require('../middleware/auth');

router.post('/', auth, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);

module.exports = router;
