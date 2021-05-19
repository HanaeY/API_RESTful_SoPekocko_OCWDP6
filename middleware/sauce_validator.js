const validator = require('validator');

exports.validateInputs = (req, res, next) => {
    console.log('test');
    console.log(req.body.sauce);
    const sauceToCheck = req.file ? JSON.parse(req.body.sauce) : req.body;
    console.log(sauceToCheck);
    if(!validator.isAlpha(sauceToCheck.name) || !(3 < sauceToCheck.name < 51)) {
        console.log('test2');
        res.status(401).json({message: "le champ 'name' ne doit contenir que des lettres et entre 3 et 50 caractères"});
    } else if(!sauceToCheck.manufacturer.match(/^[a-zA-Z\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.manufacturer < 51)) {
        res.status(401).json({message: "le champ 'manufacturer' doit compter entre 3 et 50 caractères et n'accepte pas les caractères spéciaux"});
    } else if(!sauceToCheck.description.match(/^[a-zA-Z\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.description < 401)) {
        res.status(401).json({message: "le champ 'description' doit compter entre 3 et 400 caractères et n'accepte pas les caractères spéciaux"});
    } else {
        console.log('test3');
        next();
    }
};

// sans modif d'image : renvoie bien une erreur 401 si une entrée n'est pas validée
// avec modif d'image : renvoie une erreur 500 - req.body.sauce est undefined donc l'entrée ne passe pas par la validation
