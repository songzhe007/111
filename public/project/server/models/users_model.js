'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var crypto = require('crypto');


// define the schema for our user model
var UsersSchema = new Schema({
    local            : {
        email        : {
            type: String,
            unique: true,
            required: true
        },
        hashedPassword     : {
            type: String,
            required: true
        },
        salt: String,
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    admin: Boolean,
    provider: String
}, {collection: 'users'});

UsersSchema
    .virtual('password')
    .set(function(password) {
        console.log(password);
        this._password = password;
        this.local.salt = this.makeSalt();
        this.local.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        console.log('in get virtual password: ' + this._password);
        return this._password;
    });


UsersSchema
    .virtual('user_info')
    .get(function () {
        return { '_id': this._id, 'email': this.local.email };
    });


var validatePresenceOf = function (value) {
    return value && value.length;
};

// todo: validation

UsersSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next();
    }
    console.log(this);
    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    }
    else {
        next();
    }
});


UsersSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     */

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.local.hashedPassword;
    },

    /**
     * Make salt
     */

    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     */

    encryptPassword: function(password) {
        if (!password || !this.local.salt) return '';
        var salt = new Buffer(this.local.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    }
};
// create the model for users and expose it to our app
module.exports = mongoose.model('Users', UsersSchema);
