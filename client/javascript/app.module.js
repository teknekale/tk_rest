'use strict';

// Loading 3rd party dependencies
var angular = require('angular');

require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-dropdowns');

// Loading app modules
require('data/data.module');
require('data/translations/en');
require('layout/layout.module');
require('lock/lock.module');
require('login/login.module');
require('services/services.module');

// Dependency injection
angular.module('app', [
        'ngSanitize',
        'ngRoute',
        'ngDropdowns',

        'app.data',
        'app.layout',
        'app.lock',
        'app.login',
        'app.services',
        'app.translations'
    ])
    .config(AppConfig)
    .run(AppRun);

// Global AngularJS configuration goes here
AppConfig.$inject = [];

function AppConfig() {}

AppRun.$inject = ['$rootScope'];

function AppRun($rootScope) {
    $rootScope.isLoggedIn = false;
}
