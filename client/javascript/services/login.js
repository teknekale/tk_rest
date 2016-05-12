'use strict';

var config = require('config');

angular
    .module('app.services')
    .factory('LoginService', Service);

Service.$inject = ['$http'];

function Service($http) {
    return {
        'login': function (username, password) {
            return $http
                .post(config.REST.endpoint + 'login',
                    {
                        'username': username,
                        'password': password
                    })
                .then(function (status) {
                    return status.data;
                });
        }
    };
}
