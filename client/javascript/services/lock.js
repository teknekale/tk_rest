'use strict';

var config  = require('config');

angular
    .module('app.services')
    .factory('LockService', Factory);

Factory.$inject = ['$http'];

function Factory($http) {
    return {
        'getLocks': function() {
            return $http
                    .get(config.REST.endpoint + 'locks');
        },

        'getLock': function(lockID) {
            return $http
                    .get(config.REST.endpoint + 'lock?id=' + lockID);
        },

        'insertLock': function (lock) {
            return $http
                    .post(config.REST.endpoint + 'insertLock', lock)
                    .then(function (results) {
                        return results;
                    });
        },

        'updateLock': function (id,lock) {
            return $http
                    .post(config.REST.endpoint + 'updateLock',
                        {
                            id:id,
                            lock:lock
                        })
                    .then(function (status) {
                        return status.data;
                    });
        },

        'deleteLock': function (id) {
            return $http
                    .delete(config.REST.endpoint + 'deleteLock?id=' + id)
                    .then(function (status) {
                        return status
                    });
        }
    };
}
