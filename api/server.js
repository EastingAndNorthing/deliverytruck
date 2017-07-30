// Include our packages in our main server file
const express = require('express');
app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/main');
// const cors = require('cors');
const port = 3000;

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Headers
// app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Log requests to console
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Relax. We will put the home page here later.');
});

mongoose.connect(config.database);

require('./app/routes')(app);

app.listen(config.port);
console.log('Your server is running on port ' + port + '.');
