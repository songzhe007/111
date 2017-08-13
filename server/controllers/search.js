'use strict';

var yelp = require('../config/yelp');

exports.search = function(req, res) {
    yelp.search({
        term: 'food', //req.params.term,
        location: '94043', //req.params.location,
        limit: 10
    })
        .then(function(data) {
            var jsonObj = JSON.parse(data);
            res.json(JSON.stringify(jsonObj, null, 4));
        })
        .catch(function(err) {
            res.json(500, err);
        });
}
