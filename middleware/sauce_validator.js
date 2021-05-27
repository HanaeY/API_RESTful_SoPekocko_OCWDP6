const fs = require('fs');

exports.validateInputs = (req, res, next) => {
    const sauceToCheck = req.file ? JSON.parse(req.body.sauce) : req.body;
    // on vérifie tous les champs
    if(!sauceToCheck.name.match(/^[a-zA-Zéàèï\d\-_.,!'\s]+$/i) || !(3 < sauceToCheck.name < 51) || 
        !sauceToCheck.manufacturer.match(/^[a-zA-Zéàèï\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.manufacturer < 51) ||
        !sauceToCheck.mainPepper.match(/^[a-zA-Zéàèï\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.mainPepper < 51) ||
        !sauceToCheck.description.match(/^[a-zA-Zéàèï\d\-_.,!?'\s]+$/i) || !(3 < sauceToCheck.description < 401)) {
            const errorMessage = "les champs ne doivent pas contenir de caractères spéciaux et doivent compter entre 3 et 400 caractères max !";
            // si les entrées ne sont pas valides on supprime l'image
            if(req.file) {
                const imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                const filename = imgUrl.split('/images/')[1]; 
                fs.unlink(`./images/${filename}`, () => res.status(401).json({message: errorMessage}));
            } else {
                res.status(401).json({message: errorMessage});
            }   
    } else { // sinon on passe au prochain middleware
        next();
    }
};