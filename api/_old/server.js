// var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var config = require('./config/main');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

var User = require('./app/models/user');

var port = process.env.PORT;

var index = require('./routes/index');
var redirects = require('./routes/redirects');

var app = express();

// View engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// Set static folder
// app.use(express.static(path.join(__dirname, 'client')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_HOST);
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes 
app.use('', index);
app.use('', redirects);

app.listen(port, function() {
    console.log('Server started on ', port);
})
