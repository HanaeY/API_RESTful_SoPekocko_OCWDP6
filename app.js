// importer express
const express = require('express');
const bodyParser = require('body-parser');
// body-parser permet de rendre le corps de la requête exploitable
const mongoose = require('mongoose');

const Sauce = require('./models/sauce');

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

app.post('api/sauces', (req, res, next) => {
    // supprimer l'id envoyé par le frond (car on utilisera l'id généré pa MongoDB)
    delete req.body._id;
    // création d'une nouvelle instance du modèle Sauce
    const sauce = new Sauce({
        ...req.body
    });
    sauce.likes = 0;
    sauce.dislikes = 0;
    sauce.userLiked =[];
    sauce.userDisliked =[];

    // utilisation de la méthode save de l'instance pour enregistrer le nouvel objet dans la base
    // .save retourne une Promise
    sauce.save()
        .then(() => res.status(201).json({message : 'objet créé !'}))
        .catch(error => res.status(400).json({error}));
});

app.put('/api/sauces/:id', (req, res, next) => {
    Sauce.updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message : 'sauce modifiée !'}))
        .catch(error => res.status(400).json({error}));
});

app.delete('/api/sauces/:id', (req, res, next) => {
    Sauce.deleteOne({_id : req.params.id})
        .then(() => res.status(200).json({message : 'sauce supprimée !'}))
        .catch(error => res.status(400).json({error}));
});

app.get('/api/sauces', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
});

app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
});


module.exports = app;