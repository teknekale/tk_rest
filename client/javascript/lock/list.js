'use strict';

require('lock/list.html');

angular
    .module('app.lock')
    .controller('ListController', Controller);

Controller.$inject = ['$rootScope', 'LockService'];

function Controller($rootScope, LockService) {
    var vm = this;

    $rootScope.title = 'Locks List';

    LockService
        .getLocks()
        .then(
            function(response) {
                vm.locks = response.data;
            }
        );
}
