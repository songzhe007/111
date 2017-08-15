'use strict';
angular.module('yelpApp')
    .controller('ProfilesCtrl', function ($scope, $http, Auth, $location, $rootScope) {
        $scope.init = function() {
            if (!$rootScope.currentUser) {
                console.log('redirecting..');
                $location.path('/');
            } else {
                $http({
                    url: '/api/profiles',
                    method: 'GET'
                }).success(function(reviews) {
                    reviews.forEach(function(r) {r.editing = false;});
                    console.log('reviews: ', reviews);
                    $scope.reviews = reviews;
                }).error(function(error){
                    $scope.reviews = error;
                });

                $http({
                    url: '/api/profiles/userinfo',
                    method: 'GET',
                }).success(function(userinfo) {
                    console.log('userinfo fetch success!', userinfo[0].firstName, userinfo[0].lastName);
                    $scope.firstName = userinfo[0].firstName;
                    $scope.lastName = userinfo[0].lastName;
                    $rootScope.currentUser.firstname = userinfo[0].firstName;
                    $rootScope.currentUser.lastname = userinfo[0].lastName;
                }).error(function(error) {
                    $scope.reviews = error;
                });

            }

        };

        $scope.updateInfo = function() {
            $http({
                url: '/api/profiles/userinfo',
                method: 'POST',
                params: {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName
                }
            }).success(function(userinfo) {
                $scope.isUpdated=true;

            }).error(function(error) {
                $scope.reviews = error;
            });
        };

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
        };

        $scope.edit = function(review) {
            review.editing=true;
        };

        $scope.doneEditing = function (review) {
            console.log('done editing!');
            review.editing = false;
            $http({
                url: '/api/reviews/update',
                method: 'POST',
                params: {
                    reviewId: review._id,
                    title: review.title,
                    content: review.content
                }
            }).success(function(review) {
                $scope.isEdited=true;
                $scope.edited= "Reviews Updated!"

            }).error(function(error) {
                $scope.reviews.error;
            });
        };

        $scope.deleteAccount = function() {
            console.log('delete account: ', $rootScope.currentUser.email);
            $http({
                url: '/api/users',
                method: 'DELETE',
                params: {
                    email: $rootScope.currentUser.email
                }
            }).success(function(user) {
                $scope.isDeleteAccount=true;
               // $location.url("/");
            }).error(function(err) {
                console.log(err);
            });
            Auth.logout();
            //window.location.href = "/login";

        }
    });
