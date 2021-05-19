const Sauce = require('../models/sauce'); // import du modèle mongoose Sauce
const fs = require('fs'); // module permettant la gestion du système de fichiers

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // suppression de l'id envoyé par le frond (car on utilisera l'id généré pa MongoDB)
    const imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    const sauce = new Sauce({ // création d'une nouvelle instance du modèle Sauce + validation des données (>> mongoose-validator.js)
        ...sauceObject, // on applique les champs de la requête
        imageUrl : imgUrl,
    });
    sauce.save() // enregistre sauce dans la base de données et retourne une promesse ...
        .then(() => res.status(201).json({message : 'objet créé !'}))
        .catch((error) => {
            const filename = imgUrl.split('/images/')[1]; // si les entrées ne sont pas validées on supprime l'image
            fs.unlink(`./images/${filename}`, () => res.status(400).json({error}));
            });
};

exports.modifySauce = (req, res, next) => {
    let sauceObject;
    if(!req.file) { // cas où il n'y a pas de nouvelle image dans les modifications
        sauceObject = {...req.body}; // on se contente de récupérer les champs de la requête 
        Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id: req.params.id}) // et on met la sauce à jour
            .then(() => res.status(200).json({message : 'sauce modifiée !'}))
            .catch(error => res.status(400).json({error}));
    } else { // cas où les modifications comportent une nouvelle image 
        Sauce.findOne({_id : req.params.id})
        .then(sauce => {
            const formerFile = sauce.imageUrl.split('/images/')[1]; // un récupère le nom de l'image actuelle
            fs.unlink(`./images/${formerFile}`, () => { // on supprime l'image actuel du fichier images 
                sauceObject = JSON.parse(req.body.sauce); // la sauce est au format form-data, on la convertit en objet json
                sauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // on écrit l'url de l'image
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
        fs.unlink(`./images/${filename}`, () => { // on supprime l'image de la sauce supprimée 
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
                case 1 : // le front envoie un like
                    if(!sauce.usersLiked.includes(userId)) {
                        sauce.usersLiked.push(userId); // ajout de l'utilisateur dans le tableau 
                        sauce.likes ++; // ajout d'un like aux likes du produit 
                        sauce._id = req.params.id; // on reprend l'id des param de la requête
                        Sauce.updateOne({_id: req.params.id}, sauce) // mise à jour de la sauce
                            .then(() => res.status(200).json({message : "J'aime ajouté !"}))
                            .catch(error => res.status(400).json({error}));
                    } else {
                        throw {error: "Cette action n'est pas possible !"}; 
                    }
                    break; 
                case -1 : // le front envoie un dislike 
                    if(!sauce.usersDisliked.includes(userId)) {
                        sauce.usersDisliked.push(userId);
                        sauce.dislikes ++;
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                            .then(() => res.status(200).json({message : "je n'aime pas ajouté !"}))
                            .catch(error => res.status(400).json({error}));
                    } else {
                        throw {error: "Cette action n'est pas possible !"}; 
                    }
                    break;
                case 0 : // le front demande d'annuler lelike/dislike 
                const usersLikedIndex = sauce.usersLiked.indexOf(userId);
                const usersDislikedIndex = sauce.usersDisliked.indexOf(userId);
                    if(usersLikedIndex !== -1) { // si on retrouve l'utilisateur dans le tableau de ceux qui ont liké le produit
                        sauce.usersLiked.splice(usersLikedIndex, 1); // on retire l'id user du tableau 
                        sauce.likes --; // on retire un like 
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                        .then(() => res.status(200).json({message : "j'aime supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                    }
                    if(usersDislikedIndex !== -1) {
                        sauce.usersDisliked.splice(usersDislikedIndex, 1);
                        sauce.dislikes --;
                        sauce._id = req.params.id;
                        Sauce.updateOne({_id: req.params.id}, sauce)
                        .then(() => res.status(200).json({message : "je n'aime pas supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                    } else if(usersLikedIndex == -1 && usersDislikedIndex == -1) {
                        throw {error: "Cette action n'est pas possible !"}; 
                    }
                    break;       
                default : 
                throw {error: "Oups, aucune action n'est possible !"};            
            };
        })
        .catch(error => {res.status(500).json({error})});
};