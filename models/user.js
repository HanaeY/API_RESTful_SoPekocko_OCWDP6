const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // userID : créé automatiquement par MongoDB
    email : {type : String, required : true},
    // email doit être unique 
    password : {type : String, required : true},
});

module.exports = mongoose.model('User', userSchema);