/**
 * Exports config info, making it all available from the calling module.
 */

var path = require('path');

module.exports = {

    "server": {
        port: 3001
    },

    "winstonLogs": {
        transport: {
            file: {
                level: 'info',
                filename: path.join(__dirname, '../../logs/all-logs.log'),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            },
            console: {
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            }
        },
        exitOnError: false
    },

    "redis": {
        port: 9999,
        host: '127.0.0.1',
        pwd: '123698774',
        dbOpts: {
            no_ready_check: false
        }
    }

}