const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // supprimer l'id envoyé par le frond (car on utilisera l'id généré pa MongoDB)
    delete sauceObject._id;
    // création d'une nouvelle instance du modèle Sauce
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.likes = 0;
    sauce.dislikes = 0;
    sauce.userLiked = [];
    sauce.userDisliked = [];

    // utilisation de la méthode save de l'instance pour enregistrer le nouvel objet dans la base
    // .save retourne une Promise
    sauce.save()
        .then(() => res.status(201).json({message : 'objet créé !'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifySauce = (req, res, next) => {
    let sauceObject;
    if(!req.file) {
        sauceObject = {...req.body};
        Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'sauce modifiée !'}))
            .catch(error => res.status(400).json({error}));
    } else {
        Sauce.findOne({_id : req.params.id})
        .then(sauce => {
            const formerFile = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`./images/${formerFile}`, () => {
                sauceObject = JSON.parse(req.body.sauce);
                sauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'sauce modifiée !'}))
                    .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error => res.status(500).json({error}));
 
    };
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`./images/${filename}`, () => {
            Sauce.deleteOne({_id : req.params.id})
            .then(() => res.status(200).json({message : 'sauce supprimée !'}))
            .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(500).json({error}));

};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

exports.likeASauce = (req, res, next) => {
    const userId = req.body.userId;
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            switch(req.body.like) {
                case 1 : 
                    if(sauce.userLiked.includes(userId)) {
                        //res.status(200).json({message: 'sauce déjà aimée par cet utilisateur !'});
                        removeLike();
                    } else {
                        sauce.userLiked.push(userId);
                        sauce.likes ++;
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                            .then(() => res.status(200).json({message : "J'aime ajouté !"}))
                            .catch(error => res.status(400).json({error}));
                    }
                    break; 
                case -1 :
                    if(sauce.userDisliked.includes(userId)) {
                        res.status(200).json({message: 'sauce déjà desaimée par cet utilisateur !'});
                    } else {
                        sauce.userDisliked.push(userId);
                        sauce.dislikes ++;
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                            .then(() => res.status(200).json({message : "je n'aime pas ajouté !"}))
                            .catch(error => res.status(400).json({error}));
                    }
                break;
                case 0 : 
                const userLikedIndex = sauce.userLiked.indexOf(userId);
                const userDislikedIndex = sauce.userDisliked.indexOf(userId);
                    if(userLikedIndex !== -1) {
                        sauce.userLiked.splice(userLikedIndex, 1);
                        sauce.likes --;
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                        .then(() => res.status(200).json({message : "j'aime supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                    }
                    if(userDislikedIndex !== -1) {
                        sauce.userDisliked.splice(userDislikedIndex, 1);
                        sauce.dislikes --;
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                        .then(() => res.status(200).json({message : "je n'aime pas supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                    }
                    break;       
                default : 
                throw 'aucune opération possible !';            
            };
        })
        .catch(error => {res.status(500).json({error})});
};

const removeLike = () => {
    const userLikedIndex = sauce.userLiked.indexOf(userId);
    sauce.userLiked.splice(userLikedIndex, 1);
    sauce.likes --;
    sauce._id = req.params.id;
    Sauce.updateOne({_id: req.params.id}, sauce)
    .then(() => res.status(200).json({message : "j'aime supprimé !"}))
    .catch(error => res.status(400).json({error}));
};

// retrouver la sauce en question 
// si like = 1, regarder si l'utilisateur n'est pas déjà dans le tableau des userLiked
    // si oui, erreur
    // si non, ajouter l'id user dans le tableau des userLiked, ET ajouter incrémenter de 1 le nombre de likes
// si like = -1, regarder sil'utilisateur n'est pas déjà dans le tableau des userDisliked
    // si oui, erreur
    // si non, ajouter l'id user dans le tableau des userDisliked, ET incrémenter les dislikes de 1
// si like = O, regarder si l'utilisateur est dans le tableau des userLiked
    // si oui, retirer l'id user du tableau ET décrémenter les likes de 1
    // si non, regarder si d'id user est dans le tableau des userDisliked
        // si oui, retirer l'id user du tableau ET décrémenter les dislikes de 1