'use strict'

require('angular-translate');

angular
    .module('app.translations', ['pascalprecht.translate'])
    .config(Config);

Config.$inject = ['$translateProvider'];

function Config($translateProvider) {
    $translateProvider.translations('en', {

        'NO_LOCKS'      : 'No locks found',
        'NEW_LOCK'      : 'Add new Lock',
        'EDIT_LOCK'     : 'Edit this',
        'LOCK_WHAT'     : 'What',
        'LOCK_EMAIL'    : 'Email',
        'LOCK_PASSWORD' : 'Password',
        'LOCK_TYPE'     : 'Type',
        'LOCK_NOTE'     : 'Note',

        'SAVE'    : 'Save',
        'CANCEL'  : 'Cancel',
        'DELETE'  : 'Delete',
        'NEW'     : 'New',
        'BACK'    : 'Back',
        'EDIT'    : 'Edit',
        'CONFIRM' : 'Confirm'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
}