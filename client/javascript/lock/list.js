'use strict';

require('lock/list.html');

angular
    .module('app.lock')
    .controller('ListController', Controller);

Controller.$inject = ['$rootScope', 'LockService', '$location'];

function Controller($rootScope, LockService, $location) {
    var vm = this;

    $rootScope.title = 'Locks List';

    vm.deleteLock = deleteLock;

    LockService
        .getLocks()
        .then(
            function(response) {
                vm.locks = response.data;
            }
        );

    function deleteLock(lock) {
        $location.path('/');

        if (confirm("Are you sure to delete lock number: " + lock.id) === true) {
            LockService.deleteLock(lock.id);
        }
    }
}
