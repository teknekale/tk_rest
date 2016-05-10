'use strict';

require('list/list.html');

angular
    .module('app.list')
    .directive('tkList', Directive);

Directive.$inject = ['AccountService'];

function Directive(AccountService) {
    function Link($scope) {
        AccountService.getCustomers()
            .then(
                function(data) {
                    console.log(data);
                    $scope.customers = data.data;
                }
            );
    }

    return {
        'link': Link,
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'list/list.html'
    };
}
