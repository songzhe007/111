'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfilesSchema = new Schema({
    email: {
        type: String,
        index: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    facebook: {
        id:String,
        token: String
    },

}, {collection: 'yelpapp.profiles'});

module.exports = mongoose.model('Profiles', ProfilesSchema);
