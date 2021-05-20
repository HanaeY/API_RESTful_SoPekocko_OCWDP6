/* configuration de l'app express */

const express = require('express'); // import du framework express qui permet de créer l'application express

const bodyParser = require('body-parser'); // import du module body-parser qui va rendre le corps de la requête exploitable

const mongoose = require('mongoose'); // import du package mongoose qui va faciliter les interactions avec la base de données 

const path = require('path'); // donne accès au chemin du système de fichiers

// import des routeurs express 
const userRoutes = require('./routes/user_routes');
const sauceRoutes = require('./routes/sauces_routes');

// connexion de l'application à la base de données 
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.blsha.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));


const app = express(); // initialisation de l'application express

// gestion des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'autoriser l'ajout des headers donnés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // permet l'envoi de requêtes utilisant les méthodes données
    next();
});

app.use(bodyParser.json()); // la méthode json de l'objet body-parser va transformer le corps des requêtes en objets json

app.use('/images', express.static(path.join(__dirname, 'images'))); // lorsque la route /images est appelée, permet de servir le dossier statique images

app.use('/api/auth', userRoutes); // >> routes dans le fichier routes/user_routes.js
app.use('/api/sauces', sauceRoutes); // >> routes dans le fichier routes/sauces_routes.js

module.exports = app; // on exporte l'app qui sera importée pour être utilisée dans le fichier server.js