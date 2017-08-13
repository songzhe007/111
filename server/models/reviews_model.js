'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var ReviewsSchema = new Schema({
    businessId: {
        type: String,
        index: true,
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    created: Date,
    updated: Date,
    creator: String
}, {collection: 'yelpapp.reviews'});


ReviewsSchema.pre('save', function(next, done){
    console.log('pre');
    if (this.isNew)
        this.created = Date.now();

    this.updated = Date.now();
    next();
});

ReviewsSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('creator', 'username').exec(cb);
    }
};

ReviewsSchema.statics.findByBusinessId = function (businessId, callback) {
    return this.find({ businessId: businessId }, callback);
}


module.exports = mongoose.model('Reviews', ReviewsSchema);
