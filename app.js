var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var indexRoute = require('./routes/index');
var booksRoutes = require('./routes/books');
var usersRoutes = require('./routes/users');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));
app.use(cookieParser());

// public path
app.use(express.static(path.join(__dirname, 'public')));

// Global variable
app.use(function (req, res, next) {
    res.locals.testVar = "tasfin";
    next();
})

// set routes
app.use('/', indexRoute);
app.use('/', booksRoutes);
app.use('/', usersRoutes);

// set port
app.set('port', (process.env.PORT || 3000));

if(!module.parent){
    app.listen(app.get('port'), function () {
        console.log('Server started on port '+app.get('port')+'...');
    });
}


module.exports = app;
