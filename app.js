// importer express
const express = require('express');
const bodyParser = require('body-parser');
// body-parser permet de rendre le corps de la requête exploitable
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauces_routes');

mongoose.connect('mongodb+srv://SuperAdmin:fONRBkxvs5v7CV1v@cluster0.blsha.mongodb.net/SoPekockoDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// la méthode json de l'objet body-parser va transformerle corps des requêtes en objets json
app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);

module.exports = app;