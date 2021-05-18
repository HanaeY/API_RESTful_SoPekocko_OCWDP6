const mongoose = require('mongoose'); // import de mongoose qui permet de créer des schémas de données 
const uniqueValidator = require('mongoose-unique-validator'); // ce plugin permet de valider qu'une entrée est unique 

const userSchema = mongoose.Schema({ //on créé un nouveau schéma mongoose 
    email : {type : String, required : true, unique: true},
    password : {type : String, required : true},
});

userSchema.plugin(uniqueValidator); // si l'email n'est pas unique mongoose renvoie un message d'erreur au front 

module.exports = mongoose.model('User', userSchema); //le middleware sera importé dans le routeur user 