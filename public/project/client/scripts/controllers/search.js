'use strict';

angular.module('yelpApp')
    .controller('SearchCtrl', function ($http, $scope, $routeParams, $rootScope) {
        $scope.search = function() {
            console.log('search');
            $http({
                url: '/yelp/search',
                method: 'GET',
                params: {"term":$scope.term, "location": $scope.location}
            }).success(function(data){
                console.log(data);
                var businesses  = JSON.parse(data)['businesses'];
                for (var i = 0; i < businesses.length; i++) {
                    delete businesses[i]['distance'];
                    delete businesses[i]['coordinates'];
                    delete businesses[i]['phone'];

                    var address = '';
                    var location = businesses[i]['location'];
                    for (var key in location) {
                        if (location.hasOwnProperty(key)) {
                            if (location[key]) {
                                address += location[key] + ', ';
                            }
                        }
                    }
                    businesses[i]['location'] = address;

                    var category = ''
                    var c = businesses[i]['categories'];
                    for (var cc in c) {
                        category += c[cc]['title'] + ', ';
                    }
                    businesses[i]['categories'] = category;

                    var nice_url = '<a href="' + businesses[i]['url'] + '"> Yelp Link</a>';

                    var nice_img = '<a href="' + businesses[i]['url'] + '"> <img src="' + businesses[i]['image_url'] + '" height=100/> </a>';
                    console.log(nice_img);
                    delete businesses[i]['url'];
                    delete businesses[i]['transactions'];
                    delete businesses[i]['review_count'];
                    delete businesses[i]['image_url'];
                    businesses[i]['Yelp Link'] = nice_img;
                }
                $scope.yelp_businesses = businesses;
                $scope.term = '';
                $scope.location = '';
            });
        }
    });
