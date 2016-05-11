'use strict';

angular
    .module('app.data')
    .config(Routes);

require('config');

Routes.$inject = ['$routeProvider'];

function Routes($routeProvider) {
    $routeProvider.
        when('/list', {
            templateUrl: 'list/list.html',
        })

        .when('/edit-customer/:customerID', {
            templateUrl: 'edit/edit.html',
        })

        .otherwise({
            redirectTo: '/list'
        });
}
