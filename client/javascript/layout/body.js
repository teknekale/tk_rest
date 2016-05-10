'use strict';

require('layout/body.html');

angular
    .module('app.layout')
    .controller('Body', Controller);

Controller.$inject = ['$scope', '$rootScope', 'AccountService', 'customer', 'level'];

function Controller($scope, customer, level) {

    $scope.isList = level === 'list' ? true : false;
    $scope.customer = customer;
    
    if($scope.isList) {
        $scope.customerID = $routeParams.customerID ? parseInt($routeParams.customerID) : 0;
    }
}
