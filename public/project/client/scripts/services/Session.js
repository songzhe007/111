'use strict';

angular.module('yelpApp')
    .factory('Session', ['$resource', function ($resource) {
        return $resource('/auth/session/');
    }]);
