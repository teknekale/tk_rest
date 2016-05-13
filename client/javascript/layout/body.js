'use strict';

require('layout/body.html');

angular
    .module('app.layout')
    .directive('tkBody', Directive);

Directive.$inject = ['LoginService'];

function Directive(LoginService) {
    function Link($scope, $element) {
        $scope.logout = logout;

        function logout() {
            LoginService.logout();
        }
    }

    function Controller() {

    }

    return {
        'link': Link,
        'controller': ['$scope', Controller],
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'layout/body.html'
    };
}
