'use strict';

// Module dependencies.
var express  = require('express');
var app      = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var fs = require('fs');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./server/config/database');
var yelp = require('./server/config/yelp');

// Bootstrap models
var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var pass = require('./server/config/passport');

// App Configuration
app.use(morgan('dev')); // log every request to the console
app.use(express.static(path.join(__dirname, '/client')));
app.set('views', __dirname + '/client');

app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
  secret: 'secret', // session secret
  resave: true,
  saveUninitialized: true
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // use connect-flash for flash messages stored in session

mongoose.connect(configDB.url, {useMongoClient: true}); // connect to our database

//routes should be at the last
require('./server/config/routes.js')(app, passport); // load our routes and

// Start server
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
