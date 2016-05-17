var express = require('express');
var path = require('path');
//TODO: newly added
var util = require('util');
var jwt = require('jsonwebtoken');
var expressSession = require('express-session');

var app = express();
//INFO: i do not need router for my needs.It is only required if you want each r
//router to function as a mini application.
//var router = app.router();

// set the view engine to ejs
app.set('view engine', 'ejs');
//INFO: below logs as /Users/maheshrajannan/Samples/Workspaces/nodeJs/ReportingProject/DynamicDataUI/client/public
//INFO: __dirname is nothing but root.
console.log('static location '+path.join(__dirname, './client', 'public'));
//INFO: setting this so that .js and .css calls will not go through controller/router.
app.use(express.static(path.join(__dirname, './client', 'public')));
//app.set('port', port);

//TODO: take this secret in to a properties file
app.use(expressSession({
            secret:'GitHubSecret',
            resave:true,
            saveUninitialized: true,
            cookie: { secure: true }
        }
    )
);
/**
NOTE:
// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});
**/

app.get('/DfsGitHub', function(req, res) {
	var token;
    if(req.session) {
        var session = req.session;
        console.log('session is :'+ util.inspect(session));
        if(session.token) {
            token = session.token;
            console.log('session token is :'+ util.inspect(token));
            //TODO: move this to a separate file.
            //console.log('jwt.verify:'+ util.inspect(jwt.verify(token, 'GitHubSecret')));
            jwt.verify(token, 'GitHubSecret', function(err, decoded) {
                if(err) {
                    //TODO: if token is expired regenerate token here.
                    console.log('Error verifying token' + err);
                } else {
                    console.log('Decoded Token:' + decoded.Username); // bar
                }
            });
        } else {
            //https://github.com/auth0/node-jsonwebtoken
            //I found from jackal of javascript about jsonwebtoken, then used a rudimentary version of it.
            //INFO:TODO please note that jwt.verify does not log properly when verification fails, if no call back function is provided.
            //TODO move it to the service
            token = jwt.sign({ Username: 'apiuser' }, 'GitHubSecret',{expiresIn: 300});
            session.token = token;
            console.log('Added session token is :'+ util.inspect(session.token));
        }
    }	
	res.render('pages/DfsGitHub',{
		jsonWebTokenValue:token
	});
});

module.exports = app;