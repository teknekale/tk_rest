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

        function loginAction() {
            var response;

            if (config.hasOwnProperty('debug') &&
                config.debug.hasOwnProperty('autoLogin') &&
                config.debug.autoLogin) {

                loginSuccess();
            }
            else {
                response = LoginService.login(
                    $scope.credentials.username,
                    $scope.credentials.password
                );

                response.status ? loginSuccess(response) : loginFail(response);
            }
        }

        function loginSuccess(response) {
            if (config.hasOwnProperty('debug') &&
                config.debug.hasOwnProperty('user') &&
                config.debug.hasOwnProperty('autoLogin') &&
                config.debug.autoLogin) {

                $rootScope.user = config.debug.user;
            }
            else {
                $rootScope.user = response;
            }

            $rootScope.isLoggedIn = true;
        }

        //TODO: change data structure
        function loginFail(response) {
            $scope.errorList.length = 0;
            $scope.errorList.push(response.error);
        }
    }

    return {
        'link': Link,
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'login/login.html'
    }
}
