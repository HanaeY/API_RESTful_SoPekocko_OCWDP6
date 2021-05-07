// importer express
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://SuperAdmin:fONRBkxvs5v7CV1v@cluster0.blsha.mongodb.net/SoPekockoDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    console.log('requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.json({message : "requête reçue !"});
});

module.exports = app;