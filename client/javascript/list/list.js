'use strict';

require('list/list.html');

angular
    .module('app.list')
    .controller('ListController', Controller);

Controller.$inject = ['AccountService'];

function Controller(AccountService) {
    var vm = this;

    AccountService.getCustomers()
        .then(
            function(data) {
                console.log(data);
                vm.customers = data.data;
            }
        );
}
