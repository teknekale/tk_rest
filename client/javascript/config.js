'use strict';

var url =  'http://127.0.0.1:8888/edsa-rest/';

module.exports = {
    'REST': {
        'endpoint': url + 'service/'
    },

    'debug' : {
        'autoLogin': true,
        'user': {
            'id'       : 1,
            'username' : 'simone.pachera',
            'nome'     : 'Simone',
            'cognome'  : 'Pachera',
            'email'    : 'pachera.simone@gmail.com',
            'type'     : 'A'
        }
    }
};
