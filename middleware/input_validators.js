const validator = require('validator');

exports.validateEmail = (req, res, next) => {
    if(!validator.isEmail(req.body.email)) {
        res.status(401).json({message: "l'email rentré n'est pas valide"});
    } else {
        next();
    }
};

exports.validatePassword = (req, res, next) => {
    if(!validator.isStrongPassword(req.body.password)) {
        res.status(401).json({message: "le mot de passe doit contenir au moins 8 caractères dont au moins 1 lettre minuscule, 1 lettre majuscule, 1 chiffre et un caractère spécial"});
    } else {
        next();
    }
}