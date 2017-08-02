// Import dependencies
const passport = require('passport');
const express = require('express');
const config = require('../config/main');
const jwt = require('jsonwebtoken');

// Set up middleware
const requireAuth = passport.authenticate('jwt', { session: false });

// Load models
const User = require('./models/user');
const Redirect = require('./models/redirect');

// Export the routes for our app to use
module.exports = function(app) {

  // Initialize passport
  app.use(passport.initialize());

  // Bring in Passport Strategy
  require('../config/passport')(passport);

  // Create API group routes
  const apiRoutes = express.Router();

  apiRoutes.post('/register', requireAuth, function(req, res) {
    if(!req.body.email || !req.body.password) {
      res.status(400).json({ success: false, message: 'Please enter email and password.' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      newUser.save(function(err) {
        if (err) {
          return res.status(400).json({ success: false, message: 'Username already taken.'});
        }
        res.status(201).json({ success: true, message: 'Success!' });
      });
    }
  });

  // Authenticate the user and retrieve a JSON Web Token
  apiRoutes.post('/authenticate', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(400).json({ success: false, message: 'Wrong username or password.' });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            const token = jwt.sign(user, config.secret, {
              expiresIn: 3600
            });
            res.status(200).json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(401).json({ success: false, message: 'Wrong username or password.' });
          }
        });
      }
    });
  });

  apiRoutes.get('/redirects/:id', function(req, res) {
    // Redirect.find({$or : [{'to': req.user._id}, {'from': req.user._id}]}, function(err, messages) {
    Redirect.findOne({ title: req.params.id }, function(err, data) {
      
      if (err) res.status(400).send(err);

      res.status(200).json(data);
    });
  });

  apiRoutes.post('/redirects', requireAuth, function(req, res) {

    const redirect = new Redirect();
    redirect.title = req.body.title;
    redirect.url = req.body.url;

    redirect.save(function(err) {
        if (err) res.status(400).json(err);
        res.status(201).json(redirect);
    });
  });

  // // PUT to update a message the authenticated user sent
  // apiRoutes.put('/redirects/:id', requireAuth, function(req, res) {
  //   Chat.findOne({$and : [{'_id': req.params.id}, {'from': req.user._id}]}, function(err, message) {
  //     if (err)
  //       res.send(err);

  //     message.message_body = req.body.message_body;

  //     // Save the updates to the message
  //     message.save(function(err) {
  //       if (err)
  //         res.send(err);

  //       res.json({ message: 'Message edited!' });
  //     });
  //   });
  // });

  // // DELETE a message
  // apiRoutes.delete('/redirects/:id', requireAuth, function(req, res) {
  //   Chat.findOneAndRemove({$and : [{'_id': req.params.id}, {'from': req.user._id}]}, function(err) {
  //     if (err)
  //       res.send(err);

  //     res.json({ message: 'Message removed!' });
  //   });
  // });

  app.use('', apiRoutes);
};
