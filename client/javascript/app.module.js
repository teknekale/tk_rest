'use strict';

// Loading 3rd party dependencies
var angular = require('angular');

require('angular-resource');
require('angular-route');
require('angular-sanitize');

// Loading app modules
require('list/list.module');
require('edit/edit.module');
require('data/translations/en');
require('data/data.module');
require('services/services.module');
require('layout/layout.module');

// Dependency injection
angular.module('app', [
        'ngSanitize',
        'ngRoute',
    
        'app.edit',
        'app.list',
        'app.data',
        'app.services',
        'app.translations',
        'app.layout'
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
