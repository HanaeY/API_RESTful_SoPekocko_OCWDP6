const validator = require('validator');

exports.validateInputs = (req, res, next) => {
    console.log('req.body.sauce: ', req.body.sauce); // s'il y a un fichier dans la req, donne 'undefined'
    console.log('req.body: ', req.body); // si pas de fichier dans la req, donne bien l'objet attendu
    const sauceToCheck = req.file ? JSON.parse(req.body.sauce) : req.body;
    if(!validator.isAlpha(sauceToCheck.name) || !(3 < sauceToCheck.name < 51)) {
        res.status(401).json({message: "le champ 'name' ne doit contenir que des lettres et entre 3 et 50 caractères"});
    } else if(!sauceToCheck.manufacturer.match(/^[a-zA-Z\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.manufacturer < 51)) {
        res.status(401).json({message: "le champ 'manufacturer' doit compter entre 3 et 50 caractères et n'accepte pas les caractères spéciaux"});
    } else if(!sauceToCheck.mainPepper.match(/^[a-zA-Z\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.mainPepper < 51)) {
        res.status(401).json({message: "le champ 'description' doit compter entre 3 et 400 caractères et n'accepte pas les caractères spéciaux"});
    } else if(!sauceToCheck.description.match(/^[a-zA-Z\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.description < 401)) {
        res.status(401).json({message: "le champ 'description' doit compter entre 3 et 400 caractères et n'accepte pas les caractères spéciaux"});
    } else {
        next();
    }
};
