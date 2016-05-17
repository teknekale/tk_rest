'use strict';

var config = require('config');

angular
    .module('app.services')
    .factory('UtilsService', Service);

Service.$inject = [];

function Service() {
    return {
        'getTimestamp': function () {
            return new Date().getTime() + '';
        }
    };
}
