/* initialisation et configuration du serveur express */

const http = require('http'); // import du package http natif de node 
const app = require('./app'); // import de l'application express


const normalizePort = val => {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 3000); //la fn normalizePort renvoie un port valide, qu'il soit donné sous forme de chaine ou de nombre

app.set('port', port); // définit le port sur lequel va tourner l'app express

const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
// création du serveur
const server = http.createServer(app); // on lui passe une fonction qui sera exécutée à chaque appel réalisé vers le serveur
  
  server.on('error', errorHandler); // la fn errorHandler recherche et gère les erreurs, .on permet de l'enregistrer dans le server

  server.on('listening', () => { // l'écouteur affiche dans la console le port ou le canal nommé sur lequel s'exécute le serveur  
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });

server.listen(port); // lancement de l'écoute du port 