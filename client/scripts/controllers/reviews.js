'use strict';

angular.module('yelpApp')
    .controller('ReviewsCtrl', function ($scope, $http, Reviews, $routeParams, $rootScope) {
        $scope.list_reviews = function() {
            console.log('in list_reviews');
            $http({
                url: '/api/reviews',
                method: 'GET',
            }).success(function(data){
                console.log('success');
                $scope.reviews = data;
                console.log(data);
            }).error(function(error){
                console.log(error);
            });
        }
    });
