'use strict';

angular
    .module('app.data')
    .config(Routes);

require('config');

Routes.$inject = ['$routeProvider'];

function Routes($routeProvider) {
    $routeProvider.
        when('/', {
            title: 'Customers',
            templateUrl: 'layout/body.html',
            controller: 'Body',
            resolve: {
                customer: '',
                level:    'list'
            }
        })

        .when('/edit-customer/:customerID', {
            title: 'Edit Customers',
            templateUrl: 'layout/body.html',
            controller: 'Body',
            resolve: {
                customer: function(AccountService, $route) {
                              var customerID = $route.current.params.customerID;
                              return AccountService.getCustomer(customerID);
                          },
                level:    'edit'
            }
        })

        .when('/new-customer', {
            title: 'Edit Customers',
            templateUrl: 'layout/body.html',
            controller: 'Body',
            resolve: {
                customer: '',
                level:    'new'
            }
        })

        .otherwise({
            redirectTo: '/'
        });
}
