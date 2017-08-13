'use strict';
var app = angular.module("yelpApp", ["ngRoute", "ngSanitize", "ngCookies", "ngResource"]);

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
      controller: 'ReviewsCtrl'
    })
    .when('/reviews/store/:businessId/create', {
      templateUrl: 'views/partials/reviews/create.html',
      controller: 'ReviewsCtrl'
    }).when('/reviews/store/:businessId', {
      templateUrl: 'views/partials/reviews/list.html',
      controller: 'ReviewsCtrl'
    })    .when('/signup', {
      templateUrl: 'views/partials/signup.html',
      controller: 'SignupCtrl'
    })    .when('/login', {
      templateUrl: 'views/partials/login.html',
      controller: 'LoginCtrl'
    })
        .otherwise({
        redirectTo: 'views/partials/main.html'
      })
})
  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });
