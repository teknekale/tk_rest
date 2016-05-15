'use strict';

var config = require('config');

angular
    .module('app.services')
    .factory('LoginService', Service);

Service.$inject = ['$http', '$rootScope'];

function Service($http, $rootScope) {
    return {
        'login': function (username, password) {
            return $http
                .post(config.REST.endpoint + 'login',
                    {
                        'username': username,
                        'password': password
                    });
        },
        
        'logout' : function() {
            $rootScope.user = null;
            $rootScope.isLoggedIn = false;
        }
    };
}
