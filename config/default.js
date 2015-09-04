/**
 * Exports config info, making it all available from the calling module.
 */

var path = require('path');

module.exports = {

    'appName': 'express-testbed-2',

    'server': {
        port: 3001
    },

    'winstonLogs': {
        exitOnError: false,
        consoleLogLevel: 'warn',
        senecaLogLevel: 'warn',
    },

    'redis': {
        port: 9999,
        host: '127.0.0.1',
        pwd: '123698774',
        dbOpts: {
            no_ready_check: false
        }
    }

};