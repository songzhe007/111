var Yelp = require('yelp-api-v3');

// TODO: encrypt the app_id and app_secret
var yelp = new Yelp({
    app_id: 'X_8XQM6W7umJtvoQyo7WXg',
    app_secret: 'Uao3cntMO6X7c4WzsWsTzerdKR9UhLJILPaWjItpljmSyL0cvtPhOgOTRv5DzYgX'
});

module.exports = yelp;
