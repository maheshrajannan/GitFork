// load the things we need
var path = require('path');
var fs = require('fs');
var https = require('https');
var debug = require('debug')('todo-node-postgres:server');
var app = require('../app');

//TODO move this to a method.
var hskey = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/ReportingProject/SSLAcadia/server.key');
var hscert = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/ReportingProject/SSLAcadia/server.crt');

//var hskey = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/sslCerts/simpleReport-key.pem');
//var hscert = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/sslCerts/simpleReport-cert.pem')


var options = {
    key: hskey,
    cert: hscert
};

var port = normalizePort(process.env.PORT || '8080');
/**
 * Create HTTPS server.
 */

var server = https.createServer(options,app);
//var server = https.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// use res.render to load up an ejs view file

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}