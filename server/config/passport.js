'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('Users');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    console.log('email: ' + email);
    User.findOne({ 'local.email' : email }, function (err, user) {
        console.log('err: ', err);
        console.log('user: ', user);
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                'errors': {
                    'email': { type: 'Email is not registered.' }
                }
            });
        }
        if (!user.authenticate(password)) {
            return done(null, false, {
                'errors': {
                    'password': { type: 'Password is incorrect.' }
                }
            });
        }
        return done(null, user);
    });
}
                              ));
