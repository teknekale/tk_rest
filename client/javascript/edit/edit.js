'use strict';

require('edit/edit.html');

angular
    .module('app.edit')
    .controller('EditController', Controller);

Controller.$inject = ['$rootScope', '$location', '$routeParams', 'AccountService'];

function Controller($rootScope, $location, $routeParams, AccountService) {
    var vm         = this,
        customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0,
        original   = getCustomer();

    original._id   = customerID;

    $rootScope.title = (customerID > 0) ? 'Edit Customer' : 'Add Customer';
    vm.buttonText    = (customerID > 0) ? 'Update Customer' : 'Add New Customer';
    vm.customer      = getCustomer();
    vm.customer._id  = customerID;

    vm.isClean        = isClean;
    vm.deleteCustomer = deleteCustomer;
    vm.saveCustomer   = saveCustomer;

    function isClean() {
        return angular.equals(original, vm.customer);
    }

    function getCustomer() {
        return AccountService.getCustomer(customerID);
    }

    function deleteCustomer(customer) {
        $location.path('/');

        if (confirm("Are you sure to delete customer number: " + vm.customer._id) == true) {
            AccountService.deleteCustomer(customer.customerNumber);
        }
    }

    function saveCustomer(customer) {
        $location.path('/');

        if (customerID <= 0) {
            AccountService.insertCustomer(customer);
        }
        else {
            AccountService.updateCustomer(customerID, customer);
        }
    }
}
