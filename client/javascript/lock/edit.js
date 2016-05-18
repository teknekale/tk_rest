'use strict';

var _ = require('lodash');

require('lock/edit.html');

angular
    .module('app.lock')
    .controller('EditController', Controller);

Controller.$inject = ['$rootScope', '$location', '$routeParams', 'LockService', 'UtilsService'];

function Controller($rootScope, $location, $routeParams, LockService, UtilsService) {
    var vm       = this,
        lockID   = ($routeParams.lockID) ? parseInt($routeParams.lockID) : 0,
        isLoaded = false,
        original;

    $rootScope.title  = (lockID > 0) ? 'Edit Lock'   : 'Add New Lock';
    vm.buttonText     = (lockID > 0) ? 'Update Lock' : 'Add New Lock';

    vm.deleteLock = deleteLock;
    vm.saveLock   = saveLock;

    UtilsService
        .getTypes()
        .then(
            function (response) {
                vm.types = response.data;
                vm.lock.type_id = (lockID > 0) ? vm.lock.type_id : vm.types[0].id;
            }
        );

    getLock();

    function getLock() {
        if(!isLoaded) {
            LockService
                .getLock(lockID)
                .then(function (response) {
                    if (!_.isEmpty(response.data)) {
                        isLoaded = true;

                        original     = response.data;
                        original._id = lockID;

                        vm.lock      = original;
                        vm.lock._id  = original._id;
                    }
                    else {
                        vm.lock         = {};
                        vm.lock.user_id = $rootScope.user.id;
                    }
                });
        }
    }

    function deleteLock(lock) {
        $location.path('/');

        if (confirm("Are you sure to delete lock number: " + vm.lock._id) === true) {
            LockService.deleteLock(lock.id);
        }
    }

    function saveLock(lock) {
        var timestamp = UtilsService.getTimestamp();

        $location.path('/');
        vm.lock.date_edit = timestamp;

        if (lockID <= 0) {
            vm.lock.date_create = timestamp;
            LockService.insertLock(lock);
        }
        else {
            LockService.updateLock(lockID, lock);
        }
    }
}
