const mongoose = require('mongoose'); // import de mongoose qui permettra de créer des schémas de données et des modèles
const validator = require('../mongoose_validators/mongoose_validators'); // ce module permettra de valider les données 

// Fonction schema du package mongoose à laquelle on passe un objet de configuration 
// permet de définir les attributs des param de l'objet 
const sauceSchema = mongoose.Schema({
    userId : {type : String, required : true}, // id unique créé par mongoDB
    name : {type : String, required : true, validate: validator.nameValidator},
    manufacturer : {type : String, required : true, validate: validator.manufacturerValidator},
    description : {type : String, required : true, validate: validator.descriptionValidator},
    mainPepper : {type : String, required : true, validate: validator.nameValidator},
    imageUrl : {type : String, required : true},
    heat : {type : Number, required : true}, 
    likes : {type : Number, required : true, default: 0}, 
    dislikes : {type : Number, required : true, default: 0}, 
    usersLiked : {type : [String], required : true, default: []},
    usersDisliked : {type : [String], required : true, default: []},
});

module.exports = mongoose.model('Sauce', sauceSchema); // on créé un modèle Sauce en utilisant le schéma sauceSchema