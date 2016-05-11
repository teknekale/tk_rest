'use strict';

require('layout/body.html');

angular
    .module('app.layout')
    .directive('aplBody', Directive);

Directive.$inject = [];

function Directive() {
    function Link($scope, $element) {

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
