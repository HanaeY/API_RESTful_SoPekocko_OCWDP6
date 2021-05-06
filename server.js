// import du package http
const http = require('http');
const app = require('./app');

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

const port = normalizePort(process.env.PORT || 3000);
//la fn normalizePort renvoie un port valide, qu'il soit donné sous forme de chaine ou de nombre

app.set('port', port);

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
// on lui passe une fonction qui sera exécutée à chaque appel réalisé vers le serveur
const server = http.createServer(app);
  
  server.on('error', errorHandler);
// la fn errorHandler recherche et gère les erreurs, .on permet de l'enregistrer dans le server

  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
// l'écouteur indique dans la console le port ou le canal nommé sur lequel s'exécute le serveur  

// configuration du server
server.listen(port);