const multer = require('multer'); // import du package multer qui permet de gérer les requêtes contenant des fichiers (encodage multipart/form-data)

//dictionnaire mime types > extentions qui permet de géner les extensions des fichiers à partir de leur mime type
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//objet de config pour multer
const storage = multer.diskStorage({// la fonction diskStorage permet de gérer l'enregistrement des fichiers entrant 
    destination: (req, file, callback) => { 
        callback(null, 'images'); //  images est le nom du dossier de destination     
    },
    filename: (req, file, callback) => { // renomme le fichier pour le rendre exploitable et unique 
        const name = file.originalname.split(' ').join('_'); // on retire les éventuels espaces 
        const extension = MIME_TYPES[file.mimetype]; // on applique une extension au fichier
        callback(null, name + Date.now() + '.' + extension); //Date.now() donne un timestamp pour rendre le nom unique 
    }
});

const maxSize = 1 * 1024 * 1024; // 1MB

module.exports = multer({storage: storage, limits: {fileSize: maxSize}}).single('image'); // le middleware multer sera importé dans le routeur sauces
// on limite la taille des fichiers grâce à l'option limits de multer, 
//en cas de fichier trop grand une erreur 500 est retournée avec un message MulterError
// la méthode .single indique qu'il n'y a qu'un seul fichier
