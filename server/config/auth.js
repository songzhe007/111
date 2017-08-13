'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

exports.reviews = {
    hasAuthorization: function(req, res, next) {
        next();
    }
};
