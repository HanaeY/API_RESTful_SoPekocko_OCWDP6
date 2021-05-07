const mongoose = require('mongoose');

//Fonction schema du package mongoose à laquelle on passe un objet de configuration 
// permet de définir les attributs des param del'objet 
const sauceSchema = mongoose.Schema({
    userId : {type : String, required : true}, 
    // userId : id unique créé par MongoDB pour l'user qui créé le produit sauce
    name : {type : String, required : true},
    manufacturer : {type : String, required : true},
    description : {type : String, required : true},
    imageUrl : {type : String, required : true},
    heat : {type : Number, required : true}, 
    // TO DO : ajouter des val min et max : 0 à 10 pour le heat ou côté front ? 
    likes : {type : Number, required : true}, 
    dislikes : {type : Number, required : true}, 
    userLiked : {type : [String], required : true},
    userDisliked : {type : [String], required : true},
});

module.exports = mongoose.model('Sauce', sauceSchema);