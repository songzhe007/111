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


exports.create = function(req, res) {
    console.log('create');
    console.log('---params');
    console.log(req.params);
    console.log('---query');
    console.log(req.query);
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
//};
