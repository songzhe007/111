'use strict';

angular.module('yelpApp')
    .controller('NavbarCtrl', function ($scope, Auth, $location) {
        console.log('navbar ctrl!');
        $scope.menu = [{
            "title": "Search",
            "link": "search"
        }, {
            "title": "See all reviews",
            "link": "reviews"
        }];

        $scope.authMenu = [{
            "title": 'Profile',
            "link": 'profile'
        }];


        $scope.adminMenu = [{
            "title": "View All Users",
            "link": "admin"
        }];

        $scope.logout = function() {
            Auth.logout(function(err) {
                if(!err) {
                    $location.path('/login');
                }
            });
        };
    });
