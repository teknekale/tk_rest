webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Loading 3rd party dependencies
	var angular = __webpack_require__(1);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);

	// Loading app modules


	// Dependency injection
	angular.module('app', [
	        'ngSanitize',
	        'ngRoute'

	    ])
	    .config(AppConfig)
	    .run(AppRun);

	// Global AngularJS configuration goes here
	AppConfig.$inject = [];

	function AppConfig() {

	}

	AppRun.$inject = ['$rootScope'];

	function AppRun($rootScope) {
	    $rootScope.isLoggedIn = false;
	}


/***/ }
]);