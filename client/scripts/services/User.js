angular.module('yelpApp')
    .factory('User', function ($resource) {
        return $resource('/auth/users/:id/', {},
                         {
                             'update': {
                                 method:'PUT'
                             }
                         });
    });
