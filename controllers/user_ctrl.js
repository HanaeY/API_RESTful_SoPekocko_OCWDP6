const User = require('../models/user'); // import du modèle mongoose User créé 
const bcrypt = require('bcrypt'); // import de la librairie bcrype qui permettra de hasher et saler le mot de passe
const Maskdata = require('maskdata'); // import du module maskdata qui permettra de masquer les emails dans la base de données 
const jwt = require('jsonwebtoken'); // import du module jwt qui permet de créer et vérifier des tokens

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hashage et salage du mot de passe 
        .then(hash => {
            const user = new User({ // création d'une nouvelle instance du modèle User = nouvel utilisateur
                email : Maskdata.maskEmail2(req.body.email), // on utlise maskdata pour masquer l'email 
                password : hash
            });
            user.save() // on enregistre l'utilisateur dans la base de données
                .then(() => res.status(201).json({message : 'utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));   
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email : Maskdata.maskEmail2(req.body.email)}) // on recherche l'utilisateur dans la base avec l'email de la requête
        .then(user => {
            if(!user) { // cas où on ne trouve pas d'utilisateur avec l'email donné
                res.status(401).json({message : 'utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password) // si utilisateur trouvé, on compare les hashs des mots de passe de la base et de la requête
                .then(valid => { //le promesse retourne un bouléen 
                    if(!valid) { // pas où les deux hash ne correspondent pas
                        res.status(401).json({message : 'mot de passe incorrect !'});  
                    } else {
                        res.status(200).json({ // si le mot de passe est bon, on retourne un token d'authentification qui sera valable 24h
                            userId : user._id,
                            token : jwt.sign(
                                {userId : user._id}, // le payload qui sera intégré au token
                                'process.env.SECRET_KEY', 
                                {expiresIn: '24h'}
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({error})); // impossible de comparer les hash de mot de passe           
        })
        .catch(error => res.status(500).json({error})); // impossible de rechercher l'utilisateur avec l'email donné
};