'use strict';

angular.module('yelpApp')
    .controller('LoginCtrl', function ($scope, Auth, $location, $http, $rootScope) {
        $scope.error = {};
        $scope.user = {};

        $scope.login = function(form) {
            console.log('login');
            Auth.login('password', {
                local: {
                    'email': $scope.user.email,
                    'password': $scope.user.password
                }
            },
                       function(err) {
                           $scope.errors = {};

                           if (!err) {
                               $location.path('/');
                               $http({
                                   url: '/api/profiles/userinfo',
                                   method: 'GET'
                               }).success(function(profile) {
                                   console.log('success get profile', profile);
                                   $rootScope.currentUser.firstname = profile[0].firstName;
                                   $rootScope.currentUser.lastname = profile[0].lastName;
                               }).error(function(error) {
                                   console.log(error);
                               });

                           } else {
                               angular.forEach(err.errors, function(error, field) {
                                   form[field].$setValidity('mongoose', false);
                                   $scope.errors[field] = error.type;
                               });
                               $scope.error.other = err.message;
                           }
                       });
        };
    });
