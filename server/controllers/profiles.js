'use strict';

var mongoose = require('mongoose'),
    Profiles = mongoose.model('Profiles'),
    Reviews = mongoose.model('Reviews');

// list reviews
exports.all_reviews = function(req, res) {
    console.log(req.user);
    console.log('email: ' + req.user.local.email);

    Reviews.find({creator: req.user.local.email}, function(error, reviews) {
        if (error) {
            res.status(500).json(error);
        } else {
            console.log('find by author result:', reviews);
            res.json(reviews);
        }
    })
};

exports.fetch_userinfo = function(req, res) {
    console.log('fetch_userinfo, ', req.user.local.email);
    Profiles.find({email: req.user.local.email},
                  function(error, userinfo) {
                      if (error) {
                          console.log('error: ', error);
                          res.status(500).json(error);
                      } else {
                          console.log('fetch userinfo:', userinfo);
                          res.json(userinfo);
                      }
                  });
};

exports.update_userinfo = function(req, res) {
    console.log('update_userinfo, ', req.query);
    Profiles.findOneAndUpdate({email: req.user.local.email}, {firstName: req.query.firstName, lastName: req.query.lastName},
                              { upsert: true, new: true, setDefaultsOnInsert: true },
                              function(error, userinfo) {
                                  if (error) {
                                      console.log('error: ', error);
                                      res.status(500).json(error);
                                  } else {
                                      res.json(userinfo);
                                  }
                              });

};
