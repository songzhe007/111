'use strict';

angular.module('yelpApp')
    .controller('ReviewsCtrl', function ($scope, $http, Reviews, $routeParams, $rootScope, $location) {
        $scope.list_reviews = function() {
            console.log('in list_reviews');
            console.log('businessId: ' + $routeParams.businessId);
            console.log('currentUser:', $rootScope.currentUser);
            if ($rootScope.currentUser) {
                $scope.isAdmin = $rootScope.currentUser.admin;
            }
            if ($routeParams.businessId && $rootScope.currentUser) {
                $scope.enable_write_review = true;
                $scope.businessId = $routeParams.businessId;
                $scope.actionUrl = '/#/reviews/store/' + $routeParams.businessId  + '/create';
            } else {
                $scope.enable_write_review = false;
            }
            $http({
                url: '/api/reviews',
                method: 'GET',
                params: {
                    businessId: $routeParams.businessId
                }
            }).success(function(data){
                $scope.reviews = data;
            }).error(function(error){
                console.log(error);
            });
        };

        $scope.create = function() {
            if (!$rootScope.currentUser) {
                window.location.href = '/';
                return;
            }
            console.log('in create');
            console.log($routeParams.businessId);
            $http({
                url: '/api/reviews/store/' + $routeParams.businessId + '/create',
                method: 'POST',
                params: {
                    businessId: $routeParams.businessId,
                    title: $scope.title,
                    content: $scope.content
                }
            }).success(function(data){
                console.log('success');
                window.location.href = "/reviews";
                $scope.reviews = data;
                console.log(data);
            }).error(function(error){
                console.log(error);
            });
        }

        $scope.deleteReview = function(index) {
            console.log('delete review!');
            var id = $scope.reviews[index]._id;
            $scope.reviews.splice(index, 1);
            $http({
                url: '/api/reviews',
                method: 'DELETE',
                params: {
                    reviewId: id
                }
            }).success(function(userinfo){

            }).error(function(error) {
                $scope.reviews = error;
            });
        }

    });
