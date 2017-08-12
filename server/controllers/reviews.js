'use strict';

var mongoose = require('mongoose'),
    Reviews = mongoose.model('Reviews');

// list all reviews
exports.all = function(req, res) {
    console.log('reviews.all');
    Reviews.find({}, function (err, reviews) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(reviews);
        }
    });

};

exports.create = function(req, res) {
    console.log('create');
    var review = new Reviews(req.body);
    review.creator = req.user;

    review.save(function(err) {
        console.log('saving');
        if (err) {
            res.json(500, err);
        } else {
            res.json(blog);
        }
    });
};
//};
