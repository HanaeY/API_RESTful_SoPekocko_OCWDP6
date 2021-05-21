const mongoose = require('mongoose'); // import de mongoose qui permettra de créer des schémas de données et des modèles

// Fonction schema du package mongoose à laquelle on passe un objet de configuration 
// permet de définir les attributs des param de l'objet 
const sauceSchema = mongoose.Schema({
    userId : {type : String, required : true}, // id unique créé par mongoDB
    name : {type : String, required : true},
    manufacturer : {type : String, required : true},
    description : {type : String, required : true},
    mainPepper : {type : String, required : true},
    imageUrl : {type : String, required : true},
    heat : {type : Number, required : true}, 
    likes : {type : Number, required : true, default: 0}, 
    dislikes : {type : Number, required : true, default: 0}, 
    usersLiked : {type : [String], required : true, default: []},
    usersDisliked : {type : [String], required : true, default: []},
});

module.exports = mongoose.model('Sauce', sauceSchema); // on créé un modèle Sauce en utilisant le schéma sauceSchema