var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {
    var users = [];

    // GET Calls.
    app.get('/api/user', findUserAllUser);
    app.get('/api/user/:uid', findUserById);

    // POST Calls.
    app.post('/api/user', createUsers);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    //google auth
    app.post('/api/login', passport.authenticate('LocalStrategy'), login);
    app.get('/api/checkLoggedIn', checkLoggedIn);
    app.post('/api/register', register);
    app.post('/api/logout', logout);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/login'
        }));
    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID || '866775234481-fuoakisihin0diulrpc1plv223kbnvvq.apps.googleusercontent.com'
        ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'XMLQzuojCaHinP-vFTxX5wfz',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://webdev-summer-2017-zhesong.herokuapp.com/auth/google/callback'
        || 'http://localhost:5000/auth/google/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        models
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            password: "0",
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            test: "haha",
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return models
                            .userModel
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    passport.use('LocalStrategy', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        models
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else if (user && !bcrypt.compareSync(password, user.password)) {
                        return done(null, null);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        models
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkLoggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        models
            .userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    res.json(user);
                });
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    //API implementation
    function createUsers(req, res) {
        var user = req.body;
        models
            .userModel
            .findUserByUsername(user.username)
            .then(
                function (response) {
                    if (response) {
                        res.sendStatus(400).send(error);
                    } else {
                        models
                            .userModel
                            .createUser(user)
                            .then(
                                function (newUser) {
                                    res.json(newUser);
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                }
            );
    }

    function findUserAllUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            models
                .userModel
                .findUserByCredentials(username, password)
                .then(
                    function (user) {
                        if (user) {
                            res.json(user);
                        } else {
                            res.send(null);
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    });

        } else if (username) {
            models
                .userModel
                .findUserByUsername(username)
                .then(
                    function (user) {
                        if (user) {
                            res.json(user);
                        } else {
                            res.send(null);
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    });
        }

    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        models
            .userModel
            .findUserById(uid)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        user = null;
                        res.send(user);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var uid = req.params.uid;
        var new_user = req.body;
        models
            .userModel
            .updateUser(uid, new_user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        models
            .userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};