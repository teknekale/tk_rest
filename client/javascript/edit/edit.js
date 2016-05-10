angular
    .module('app.edit')
    .controller('Edit', EditController);

EditController.$inject = ['$scope', '$rootScope', '$location', '$routeParams', 'AccountService', 'customer'];

function EditController($scope, $rootScope, $location, $routeParams, AccountService, customer) {
    var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0,
        original   = customer.data;

    original._id = customerID;

    $rootScope.title    = (customerID > 0) ? 'Edit Customer' : 'Add Customer';
    $scope.buttonText   = (customerID > 0) ? 'Update Customer' : 'Add New Customer';
    $scope.customer     = angular.copy(original);
    $scope.customer._id = customerID;

    $scope.isClean        = isClean;
    $scope.deleteCustomer = deleteCustomer;
    $scope.saveCustomer   = saveCustomer;

    function isClean() {
        return angular.equals(original, $scope.customer);
    }

    function deleteCustomer(customer) {
        $location.path('/');

        if(confirm("Are you sure to delete customer number: "+$scope.customer._id)==true) {
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
