module.exports = function(mongoose){
    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model('User', userSchema);

    var api = {
        'createUser' : createUser,
        'findUserById' : findUserById,
        'findUserByUsername' : findUserByUsername,
        'findUserByCredentials' : findUserByCredentials,
        'updateUser' : updateUser,
        'updateUserRole' : updateUserRole,
        'deleteUser' : deleteUser,
        'insertWebsiteToUser' : insertWebsiteToUser,
        'findUserByGoogleId' : findUserByGoogleId
    };

    return api;

    function insertWebsiteToUser(userId, websiteId){
        userModel
            .findById(userId)
            .then(function (user) {
                user.websites.push(websiteId);
                user.save();
            });
    }

    function createUser(user){
        var newUser = {
            username : user.username,
            password : user.password,
            websites : []
        };

        if(user.firstName){
            // newUser.firstName = user.firstName;
            newUser.firstName = "test";
        }
        if(user.lastName){
            newUser.lastName = user.lastName;
        }
        if(user.email){
            newUser.email = user.email;
        }
        if(user.phone){
            newUser.phone = user.phone;
        }
        if(user.google){
            newUser.google = {
                id : user.google.id,
                token : user.google.token
            };
        }

        return userModel.create(newUser);
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }

    function findUserByUsername(username){
        return userModel.findOne({username : username})
    }


    function findUserByCredentials(username, password){
        return userModel.findOne({
            username : username,
            password : password
        });
    }

    function updateUser(userId, user){
        return userModel.update({
            _id : userId
        }, {
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email
        });
    }

    function updateUserRole(userId, role){
        return userModel.update({
            _id : userId
        }, {
            driver: role
        });
    }


    function deleteUser(userId){
        return userModel.remove({
            _id : userId
        });
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id' : googleId});
    }
};