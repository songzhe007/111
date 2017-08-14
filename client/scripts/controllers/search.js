'use strict';

angular.module('yelpApp')
    .controller('SearchCtrl', function ($http, $scope, $routeParams, $rootScope) {
        $scope.search = function() {
            console.log('search');
            $scope.yelp_businesses = null;
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

                    var category = '';
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
                    //
                    businesses[i]["Name"] = businesses[i]["name"];
                    businesses[i]["Address"] = businesses[i]["location"];
                    businesses[i]["Categories"] = businesses[i]["categories"];
                    businesses[i]["Phone"] = businesses[i]["display_phone"];
                    businesses[i]["Rating"] = businesses[i]["rating"];
                    businesses[i]["Price"] = businesses[i]["price"];
                    businesses[i]["Status"] = businesses[i]["is_closed"] ? "Closed" : "Open";
                    //
                    delete businesses[i]["name"];
                    delete businesses[i]["is_closed"];
                    delete businesses[i]["categories"];
                    delete businesses[i]["rating"];
                    delete businesses[i]["price"];
                    delete businesses[i]["location"];
                    delete businesses[i]["display_phone"];
                }
                $scope.yelp_businesses = businesses;
                $scope.term = '';
                $scope.location = '';
            });
        }
    });
