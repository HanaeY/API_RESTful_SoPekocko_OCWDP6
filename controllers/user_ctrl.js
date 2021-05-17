const User = require('../models/user');
const bcrypt = require('bcrypt');
const maskdata = require('maskdata');
const jwt = require('jsonwebtoken');

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : maskdata.maskEmail2(req.body.email, emailMask2Options), 
                password : hash
            });
            console.log(email);
            user.save()
                .then(() => res.status(201).json({message : 'utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));   
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if(!user) {
                res.status(401).json({message : 'utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        res.status(401).json({message : 'mot de passe incorrect !'});  
                    }
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign(
                            {userId : user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));           
        })
        .catch(error => res.status(500).json({error}));
};