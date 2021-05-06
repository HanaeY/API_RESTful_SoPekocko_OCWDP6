// importer express
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.json({message : "requête reçue !"});
});

module.exports = app;