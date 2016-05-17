var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util=require('util');
var routes = require('./server/index');

var app = express();

//INFO: this just left for information...what is favicon.
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('combined'));
app.use(bodyParser.json());
//INFO: this means something...you can only read arrays in request after setting this to true.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//INFO: if there is need to add some static pages, explaining use of service, then un-comment line below.
//app.use(express.static(path.join(__dirname, './client', 'public')));
//INFO: View engine is added,for the reason as below.
//If there is an error, we need to display an error page, to display an error page set a view engine.
app.set('view engine', 'ejs');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('Caught an error');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log('Caught an error in development');
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('err is :'+ util.inspect(err));
    console.log('req is :'+ util.inspect(req));
    console.log('res is :'+ util.inspect(res));
    console.log('next is :'+ util.inspect(next));    
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
