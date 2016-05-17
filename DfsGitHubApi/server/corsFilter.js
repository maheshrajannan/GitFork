var cors = require('cors');
var fs = require('fs');

//var hskey = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/Udemy/sslCerts/hacksparrow-key.pem');
//var hscert = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/Udemy/sslCerts/hacksparrow-cert.pem')

//var hskey = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/sslCerts/simpleReport-key.pem');
//var hscert = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/sslCerts/simpleReport-cert.pem')

//TODO move this to a method.
var hskey = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/ReportingProject/SSLAcadia/server.key');
var hscert = fs.readFileSync('/Users/maheshrajannan/Samples/Workspaces/nodeJs/ReportingProject/SSLAcadia/server.crt');


var whitelist = ['https://localhost:8080'];

var corsOptions = {
  origin: function(origin, callback){
    console.log("checking if this is whitelisted "+origin);
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    console.log("checked if this is whitelisted "+originIsWhitelisted);
    callback(null, originIsWhitelisted);
  },
    key: hskey,
    cert: hscert
};


module.exports.corsOptions = corsOptions;
