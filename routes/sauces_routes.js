const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces_ctrl');

router.post('/', sauceCtrl.createSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);

module.exports = router;
