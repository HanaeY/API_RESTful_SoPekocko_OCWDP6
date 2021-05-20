const jwt = require('jsonwebtoken'); // import du module jwt pour vérifier le token du header de la requête

module.exports = (req, res, next) => {
    try { // on utilise try/catch car il y a un important risque d'erreurs 
        const token = req.headers.authorization.split(' ')[1]; // on retire le mot bearer avant le token dans le header author. pour avoir le token
        const decodedToken = jwt.verify(token, 'process.env.SECRET_KEY'); // la fn verify permet de décoder le token (et s'il n'est pas valide une erreur est générée)
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) { // on compare l'id user du token avec l'id user du corps de la requête 
            throw 'user id non valable !';
        } else {
            next(); // si la requête est authentifiée on passe au middleware suivant 
        }
    } catch (error) {
        res.status(401).json({error : error | 'requête non authentifiée !'});
    }
};