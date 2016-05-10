angular
    .module('app.data')
    .config(Routes);

require('config');

Routes.$inject = ['$routeProvider'];

function Routes($routeProvider) {
    $routeProvider.
        when('/', {
            title: 'Customers',
            templateUrl: 'list/list.html',
            controller: 'List'
        })

        .when('/edit-customer/:customerID', {
            title: 'Edit Customers',
            templateUrl: 'edit/edit.html',
            controller: 'Edit',
            resolve: {
                customer:   function(AccountService, $route) {
                    var customerID = $route.current.params.customerID;
                    return AccountService.getCustomer(customerID);
                }
            }
        })

        .otherwise({
            redirectTo: '/'
        });
}
