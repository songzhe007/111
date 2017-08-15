'use strict';

var mongoose = require('mongoose'),
    Reviews = mongoose.model('Reviews');

// list reviews
exports.all = function(req, res) {
    console.log(req);
    console.log('businessId: ' + req.query.bussinessId);
    var condict = {};
    if (req.query.businessId) {
        condict = {businessId: req.query.businessId};
    }
    Reviews.find(condict, function (err, reviews) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(reviews);
        }
    });

};

exports.findByAuthor = function(creator, callback) {
    Reviews.find({creator: creator}, callback);
};

exports.create = function(req, res) {
    var review = new Reviews({
        businessId: req.query.businessId,
        title: req.query.title,
        content: req.query.content
    });
    review.creator = req.user.local.email; //req.user;

    review.save(function(err) {
        console.log('saving1');
        console.log(req.user);
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(review);
        }
    });
};

exports.delete_review = function(req, res) {
    console.log('delete review');
    Reviews.remove({_id: req.query.reviewId}, function(err) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
};

exports.update_review = function(req, res) {
    var vm= this;
    console.log('delete review, _id', req.query.reviewId);
    Reviews.findOneAndUpdate({_id: req.query.reviewId}, {title: req.query.title, content: req.query.content}, function(err) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
};
