/**
 * Exports config info, making it all available from the calling module.
 */

module.exports = {

    "server": {
        port: 3001
    },

    "logging": {

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