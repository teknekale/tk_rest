angular
    .module('app.list')
    .controller('List', ListController);

ListController.$inject = ['$scope','AccountService'];

function ListController($scope, AccountService) {
    AccountService.getCustomers()
        .then(
            function(data) {
                console.log(data);
                $scope.customers = data.data;
            }
        );
}
