'use strict';
var app = angular.module("yelpApp", ["ngRoute", "ngSanitize"]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/search', {
        templateUrl: 'views/partials/search.html',
        controller: 'SearchCtrl'
      })
    .when('/reviews', {
      templateUrl: 'views/partials/reviews/list.html',
      controller: 'ReviewsCtrl',
    })
      .otherwise({
        redirectTo: 'views/partials/main.html'
      })
  });
