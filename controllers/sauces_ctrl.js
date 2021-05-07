const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    // supprimer l'id envoyé par le frond (car on utilisera l'id généré pa MongoDB)
    delete req.body._id;
    // création d'une nouvelle instance du modèle Sauce
    const sauce = new Sauce({
        ...req.body
    });
    sauce.likes = 0;
    sauce.dislikes = 0;
    sauce.userLiked =[];
    sauce.userDisliked =[];

    // utilisation de la méthode save de l'instance pour enregistrer le nouvel objet dans la base
    // .save retourne une Promise
    sauce.save()
        .then(() => res.status(201).json({message : 'objet créé !'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message : 'sauce modifiée !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id : req.params.id})
        .then(() => res.status(200).json({message : 'sauce supprimée !'}))
        .catch(error => res.status(400).json({error}));
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