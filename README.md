# Introduction
Projet réalisé dans le cadre du parcours de formation "web développeur" Openclassrooms (projet n°6). 
## Objectifs
Construire une API sécurisée ([Documentation API](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guidelines+API.pdf)) respectant les critères de l'OWASP et les contraintes du RGPD.
Les compétences qui seront évaluées sont : 
* Mettre en œuvre des opérations CRUD de manière sécurisée
* Stocker des données de manière sécurisée
* Implémenter un modèle logique de données conformément à la réglementation

## Scénario
La marque de sauces "So Pekocko" souhaite développer une application d'évaluation de ses sauces piquantes qu'elle appellera "Piquante". Le projet aura vocation à devenir une boutique en ligne mais dans un premier temps la société souhaite réaliser un MVP qui sera une application permettant aux utilisateurs d'ajouter des sauces, et de liker ou disliker les sauces ajoutées par les autres utilisateurs. Pour ce projet le frontend est déjà réalisé.  

# Installation et utilisation 
## Frontend
* Cloner le frontend depuis ce dépôt et l'installer en local : https://github.com/OpenClassrooms-Student-Center/dwj-projet6 
* Pour lancer le server du frontend, 
    * ouvrir un terminal, aller dans le dossier "dwj-projet6" et 
    * lancer la commande `npm install` 
    * puis la commande `ng serve`.
* Laisser tourner le serveur en arrière-plan. 


## Backend
* Cloner le présent dépôt en local.
* Pour faire tourner le serveur, 
    * ouvrir un nouveau terminal, aller dans le dossier du backend et 
    * exécuter la commande `npm install` 
    * puis la commande `nodemon server`. Cela permet de recharger le server à chaque modification d'un des fichiers du projet. 
* Laisser tourner le serveur en arrière-plan.
* Copier le **fichier ".env.exemple"** pour créer un **fichier ".env"** et affecter les bonnes valeurs. 
* Vous pouvez mainenant aller sur http://localhost:4200/login et tester l'application ! 

# Technologies

* Serveur Node.js
* Framework Express
* Base de données MongoDB