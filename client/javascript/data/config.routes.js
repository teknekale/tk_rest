'use strict';

angular
    .module('app.data')
    .config(Routes);

require('config');

Routes.$inject = ['$routeProvider'];

function Routes($routeProvider) {
    $routeProvider.
        when('/list', {
            templateUrl: 'lock/list.html',
        })

        .when('/edit-lock/:lockID', {
            templateUrl: 'lock/edit.html',
        })

        .otherwise({
            redirectTo: '/list'
        });
}
