'use strict';

angular.module('yelpApp')
    .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {
        console.log('auth.js');
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {
      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        console.log('in Auth::login');
        console.log(user);
        Session.save({
          provider: provider,
          email: user.local.email,
          username: user.local.email,
          password: user.local.password,
        }, function(user) {
          console.log('login: user = ', user);
          if (user.admin === undefined) {
            user.admin = false;
          }
          $rootScope.currentUser = user;
          $rootScope.currentUser.username = user.local.email;
          console.log('current_user:', $rootScope.currentUser);

          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        Session.delete(function(res) {
            $rootScope.currentUser = null;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      createUser: function(userinfo, callback) {
        var cb = callback || angular.noop;
        User.save(userinfo,
          function(user) {
            $rootScope.currentUser = user;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

        currentUser: function() {
             Session.get(function(user) {
         $rootScope.currentUser = user;
       });
      },

      changePassword: function(email, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        User.update({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
            console.log('password changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      removeUser: function(email, password, callback) {
        var cb = callback || angular.noop;
        User.delete({
          email: email,
          password: password
        }, function(user) {
            console.log(user + 'removed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      }
    };
  });
