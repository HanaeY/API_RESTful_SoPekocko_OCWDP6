const multer = require('multer'); // import du package multer qui permet de gérer les fichiers entrants via des requêtes

//dictionnaire mime types > extentions : 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//objet de config pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => { // indique où le fichier sera enregistré 
        callback(null, 'images');        
    },
    filename: (req, file, callback) => { // renomme le fichier pour le rendez exploitable et unique 
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //Date.now() donne un time stamp pour rendre le nom unique 
    }
});

module.exports = multer({storage}).single('image'); // le middleware multer sera importé dans le routeur sauces
