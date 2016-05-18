'use strict';

var config = require('config');

angular
    .module('app.services')
    .factory('UtilsService', Service);

Service.$inject = ['$http'];

function Service($http) {
    return {
        'getTimestamp': function () {
            return new Date().getTime() + '';
        },

        'getTypes': function () {
            return $http
                .get(config.REST.endpoint + 'types');
        }
    };
}
