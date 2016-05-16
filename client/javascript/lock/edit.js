'use strict';

var _ = require('lodash');

require('lock/edit.html');

angular
    .module('app.lock')
    .controller('EditController', Controller);

Controller.$inject = ['$rootScope', '$location', '$routeParams', 'LockService'];

function Controller($rootScope, $location, $routeParams, LockService) {
    var vm         = this,
        lockID = ($routeParams.lockID) ? parseInt($routeParams.lockID) : 0,
        isLoaded   = false,
        original;

    $rootScope.title = (lockID > 0) ? 'Edit Lock' : 'Add Lock';
    vm.buttonText    = (lockID > 0) ? 'Update Lock' : 'Add New Lock';

    vm.deleteLock = deleteLock;
    vm.saveLock   = saveLock;

    getLock();

    function getLock() {
        if(!isLoaded) {
            LockService
                .getLock(lockID)
                .then(function (data) {
                    if (!_.isEmpty(data.data)) {
                        isLoaded = true;

                        original = data.data;
                        original._id = lockID;
                        vm.lock = original;
                        vm.lock._id = original._id;
                    }
                });
        }
    }

    function deleteLock(lock) {
        $location.path('/');

        if (confirm("Are you sure to delete lock number: " + vm.lock._id) == true) {
            LockService.deleteLock(lock.lockNumber);
        }
    }

    function saveLock(lock) {
        $location.path('/');

        if (lockID <= 0) {
            if(!lock.type) {
                lock.type = 'test';
            }

            lock.user_id = $rootScope.user.id;
            LockService.insertLock(lock);
        }
        else {
            LockService.updateLock(lockID, lock);
        }
    }
}
