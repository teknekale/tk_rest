'use strict';

require('edit/edit.html');

angular
    .module('app.edit')
    .directive('tkEdit', Directive);

Directive.$inject = ['$rootScope', '$location', '$routeParams', 'AccountService'];

function Directive($rootScope, $location, $routeParams, AccountService) {
    function Link($scope) {
        var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0,
            original = $scope.customer.data;

        original._id = customerID;

        $rootScope.title = (customerID > 0) ? 'Edit Customer' : 'Add Customer';
        $scope.buttonText = (customerID > 0) ? 'Update Customer' : 'Add New Customer';
        $scope.customer = angular.copy(original);
        $scope.customer._id = customerID;

        $scope.isClean = isClean;
        $scope.deleteCustomer = deleteCustomer;
        $scope.saveCustomer = saveCustomer;

        function isClean() {
            return angular.equals(original, $scope.customer);
        }

        function deleteCustomer(customer) {
            $location.path('/');

            if (confirm("Are you sure to delete customer number: " + $scope.customer._id) == true) {
                AccountService.deleteCustomer(customer.customerNumber);
            }
        };

        function saveCustomer(customer) {
            $location.path('/');

            if (customerID <= 0) {
                AccountService.insertCustomer(customer);
            }
            else {
                AccountService.updateCustomer(customerID, customer);
            }
        };
    }

    return {
        'link': Link,
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'edit/edit.html',
        'scope': {
            'customer':'='
        }
    };
}
