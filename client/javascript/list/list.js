'use strict';

require('list/list.html');

angular
    .module('app.list')
    .controller('ListController', Controller);

Controller.$inject = ['$rootScope', 'AccountService'];

function Controller($rootScope, AccountService) {
    var vm = this;

    $rootScope.title = 'Customer List';

    AccountService
        .getCustomers()
        .then(
            function(data) {
                console.log(data);
                vm.customers = data.data;
            }
        );
}
