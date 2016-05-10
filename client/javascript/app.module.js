'use strict';

// Loading 3rd party dependencies
var angular = require('angular');

require('angular-resource');
require('angular-route');
require('angular-sanitize');

// Loading app modules


// Dependency injection
angular.module('app', [
        'ngSanitize',
        'ngRoute'

    ])
    .config(AppConfig)
    .run(AppRun);

// Global AngularJS configuration goes here
AppConfig.$inject = [];

function AppConfig() {

}

AppRun.$inject = ['$rootScope'];

function AppRun($rootScope) {
    $rootScope.isLoggedIn = false;
}
