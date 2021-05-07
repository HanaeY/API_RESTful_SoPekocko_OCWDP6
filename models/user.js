const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    // userID : créé automatiquement par MongoDB
    email : {type : String, required : true, unique: true},
    password : {type : String, required : true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);