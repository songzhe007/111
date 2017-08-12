module.exports = function(app, passport) {
  var path = require('path');

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/views/index.html'));
  });

  app.get('/yelp/search', function(req, res) {
    var yelp = require('./yelp');
    yelp.search({term: req.query.term, location: req.query.location, limit: 10})
      .then(function (data) {
        var jsonObj = JSON.parse(data);
        res.json(data);
      })
      .catch(function (err) {
        console.error(err);
        res.json(500, err);
      });
  });

  // Reviews Routes
  var reviews = require('../controllers/reviews');
  app.get('/api/reviews', reviews.all);

  // Angular Routes
  app.get('/views/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.sendFile(requestedView);
  });
}
