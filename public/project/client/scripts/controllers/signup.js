'use strict';

angular.module('yelpApp')
    .controller('SignupCtrl', function ($scope, Auth, $location) {
        $scope.register = function(form) {
            console.log('SignupCtrl');
            Auth.createUser({
                local: {
                    email: $scope.user.email,
                    password: $scope.user.password
                }
            },
                            function(err) {
                                $scope.errors = {};

                                console.log(err);
                                if (!err) {
                                    $location.path('/');
                                } else {
                                    angular.forEach(err.errors, function(error, field) {
                                        form[field].$setValidity('mongoose', false);
                                        $scope.errors[field] = error.type;
                                    });
                                }
                            }
                           );
        };
    });
