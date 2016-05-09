'use strict';

var config =    {
    'REST': {
        'endpoint': 'services/'
    }
};

angular
    .module('lockkete', ['ngRoute'])
    .run(AppRun);

AppRun.$inject = ['$rootScope', '$location'];

function AppRun($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess',
        function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        }
    );
};

// SERVICE /////////////////////////////////////////////////////////////////////////////////////////////
angular
    .module('lockkete')
    .factory('AccountService', Factory);

Factory.$inject = ['$http'];

function Factory($http) {
    return {
        'getCustomers': function() {
            return $http.get(config.REST.endpoint + 'customers');
        },

        'getCustomer': function(customerID){
            return $http.get(config.REST.endpoint + 'customer?id=' + customerID);
        },

        'insertCustomer': function (customer) {
            return $http.post(config.REST.endpoint + 'insertCustomer', customer).then(function (results) {
                    return results;
            });
        },

        'updateCustomer': function (id,customer) {
            return $http.post(config.REST.endpoint + 'updateCustomer', {id:id, customer:customer}).then(function (status) {
                    return status.data;
            });
        },

        'deleteCustomer': function (id) {
            return $http.delete(config.REST.endpoint + 'deleteCustomer?id=' + id).then(function (status) {
                    return status
            });
        }
    };
}
// ./SERVICE ///////////////////////////////////////////////////////////////////////////////////////////


// CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////
angular
    .module('lockkete')
    .controller('List', ListController)
    .controller('Edit', EditController);

ListController.$inject = ['$scope','AccountService'];
EditController.$inject = ['$scope', '$rootScope', '$location', '$routeParams', 'AccountService', 'customer'];

function ListController($scope, AccountService) {
    var vm = this;

    AccountService.getCustomers()
        .then(
            function(data){
                $scope.customers = data.data;
            }
        );
}

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

// ./CONTROLLER ////////////////////////////////////////////////////////////////////////////////////////

// ROUTES //////////////////////////////////////////////////////////////////////////////////////////////
angular
    .module('lockkete')
    .config(Routes);

Routes.$inject = ['$routeProvider'];

function Routes($routeProvider) {
    $routeProvider.
        when('/', {
            title: 'Customers',
            templateUrl: 'partials/customers.html',
            controller: 'List'
        })

        .when('/edit-customer/:customerID', {
            title: 'Edit Customers',
            templateUrl: 'partials/edit-customer.html',
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

// ./ROUTES ////////////////////////////////////////////////////////////////////////////////////////////
