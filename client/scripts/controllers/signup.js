'use strict';

angular.module('yelpApp')
    .controller('SignupCtrl', function ($scope, Auth, $location) {
        $scope.register = function(form) {
            console.log('SignupCtrl');
            if ($scope.user.password != $scope.user.password2) {
                $scope.isMismatch = true;
                return false;
            }
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
                                    $scope.errors = err.errmsg.split(':')[0] + ': username existed!';
                                    angular.forEach(err.errors, function(error, field) {
                                        form[field].$setValidity('mongoose', false);
                                        $scope.errors[field] = error.type;
                                    });
                                }
                            }
                           );
        };
    });
