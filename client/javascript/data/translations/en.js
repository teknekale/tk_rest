'use strict'

require('angular-translate');

angular
    .module('app.translations', ['pascalprecht.translate'])
    .config(Config);

Config.$inject = ['$translateProvider'];

function Config($translateProvider) {
    $translateProvider.translations('en', {

        'NO_CUSTOMERS' : 'No customers found',
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
}