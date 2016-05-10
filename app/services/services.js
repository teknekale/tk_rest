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