'use strict';

// Loading 3rd party dependencies
var angular = require('angular');

require('angular-resource');
require('angular-route');
require('angular-sanitize');

// Loading app modules
require('data/data.module');
require('data/translations/en');
require('edit/edit.module');
require('layout/layout.module');
require('list/list.module');
require('login/login.module');
require('services/services.module');

// Dependency injection
angular.module('app', [
        'ngSanitize',
        'ngRoute',

        'app.data',
        'app.edit',
        'app.layout',
        'app.list',
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
