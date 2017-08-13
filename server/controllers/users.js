'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    passport = require('passport'),
    ObjectId = mongoose.Types.ObjectId;


exports.create = function (req, res, next) {
    console.log(req.body);
    var newUser = new User(req.body);
    console.log('create');
    console.log(newUser);
    newUser.password = req.body.local.password;

    newUser.provider = 'local';

    newUser.save(function(err) {
        console.log(err);
        if (err) {
            return res.status(400).json(err);
        }

        req.logIn(newUser, function(err) {
            if (err) return next(err);
            return res.json(newUser.user_info);
        });
    });
};

exports.show = function (req, res, next) {
    var userId = req.params.userId;

    User.findById(ObjectId(userId), function (err, user) {
        if (err) {
            return next(new Error('Failed to load User'));
        }
        if (user) {
            res.send({username: user.username, profile: user.profile });
        } else {
            res.send(404, 'USER_NOT_FOUND')
        }
    });
};

exports.exists = function (req, res, next) {
    var username = req.params.username;
    User.findOne({ username : username }, function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }

        if(user) {
            res.json({exists: true});
        } else {
            res.json({exists: false});
        }
    });
}

exports.all = function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(users);
        }
    })
}

exports.update_all = function(req, res) {
    console.log('update_all', req.query.data);
    var users = req.query.data;


    function update_sync(index) {
        if (index >= users.length) {
            return;
        }
        var u = JSON.parse(users[index]);
        User.findOne({'local.email': u['Email']}, function(err, user0) {
            console.log('u: ', u['isAdmin']);
            user0.admin = u['isAdmin'];
            user0.save(function(err) {
                if (err) {
                    console.log('is admin saving err: ', err);
                }
                update_sync(index + 1);
            });
        });

    }

    update_sync(0);
    res.status(200);
}
