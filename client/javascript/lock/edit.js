'use strict';

var _ = require('lodash');

require('lock/edit.html');

angular
    .module('app.lock')
    .controller('EditController', Controller);

Controller.$inject = ['$rootScope', '$location', '$routeParams', 'AccountService'];

function Controller($rootScope, $location, $routeParams, AccountService) {
    var vm         = this,
        customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0,
        isLoaded   = false,
        original;

    $rootScope.title = (customerID > 0) ? 'Edit Customer' : 'Add Customer';
    vm.buttonText    = (customerID > 0) ? 'Update Customer' : 'Add New Customer';

    vm.deleteCustomer = deleteCustomer;
    vm.saveCustomer   = saveCustomer;

    getCustomer();

    function getCustomer() {
        if(!isLoaded) {
            AccountService
                .getCustomer(customerID)
                .then(function (data) {
                    if (!_.isEmpty(data.data)) {
                        isLoaded = true;

                        original = data.data;
                        original._id = customerID;
                        vm.customer = original;
                        vm.customer._id = original._id;
                    }
                });
        }
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
