'use strict';

angular.module('yelpApp')
    .controller('AdminCtrl', function ($http, $scope, User, $rootScope, $location) {
        $scope.init = function() {
            console.log("in init");
            if (!$rootScope.currentUser || !$rootScope.currentUser.admin) {
                console.log('redirecting..');
                $location.path('/');
            } else {

                $http({
                    url: '/api/users',
                    method: 'GET',
                }).success(function(users) {
                    console.log('users', users);
                    //$scope.users = users;
                    // process the users
                    for (var i = 0; i < users.length; ++i) {
                        delete users[i]._id;
                        delete users[i].__v;
                        users[i]['Email'] = users[i].local.email;
                        users[i]['isAdmin'] = users[i].admin;
                        if (!users[i].admin) {
                            users[i]['isAdmin'] = false;
                        }
                        delete users[i].admin;
                        delete users[i].local;
                    }
                    $scope.users = users;
                }).error(function(err){
                    console.log(err);
                });
            }
        };

        $scope.save = function() {
            console.log('save');
            console.log($scope.users);

            $http({
                url: '/api/users',
                method: 'POST',
                params: {data: $scope.users}
            }).success(function(users) {
            }).error(function(err){
                console.log(err);
            });

        };

    });
