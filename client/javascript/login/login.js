'use strict';

var config = require('config');

require('login/login.html');

angular
    .module('app.login')
    .directive('tkLogin', Directive);

Directive.$inject = ['LoginService', '$rootScope'];

function Directive(LoginService, $rootScope) {
    function Link($scope) {
        $scope.errorList = [];

        $scope.login = loginAction;

        $scope.credentials = {
            'username': '',
            'password': ''
        };

        if (config.hasOwnProperty('debug') &&
            config.debug.hasOwnProperty('autoLogin') &&
            config.debug.autoLogin) {
            loginSuccess();
        }

        function loginAction() {
            LoginService.login(
                $scope.credentials.username,
                $scope.credentials.password
            ).then(
                function success(response) {
                    loginSuccess(response)
                },
                function fail(response) {
                    loginFail(response);
                }
            );
        }

        function loginSuccess(response) {
            $rootScope.isLoggedIn = true;

            if (config.hasOwnProperty('debug') &&
                config.debug.hasOwnProperty('user') &&
                config.debug.hasOwnProperty('autoLogin') &&
                config.debug.autoLogin) {

                $rootScope.user = config.debug.user;
                return;
            }

            $rootScope.user = response.data;
        }

        function loginFail(response) {
            $scope.errorList.length = 0;
            $scope.errorList.push(response.data.msg);
        }
    }

    return {
        'link': Link,
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'login/login.html'
    }
}
