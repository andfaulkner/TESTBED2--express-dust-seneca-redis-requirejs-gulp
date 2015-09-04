var log = require('./winston-logger');
var _ = require('lodash');
require('colors');
require('string').extendPrototype();
var config = require('app/config/default');

module.exports = (function uncaughtErrorHandler(){

    //Any uncaught errors should trigger this
    process.on('uncaughtException', function onUncaughtException (err) {
        console.log('\n' + '_'.times(100) + '\n' + '_'.times(100));
        console.log('________________UNCAUGHT EXCEPTION________________'.red.bgBlack.bold.underline);
        log.cli.dir(err);

        var splitStack = (err.stack).split('\n    ');

        var mainArg = _.filter(splitStack, (str) => str.contains(config.appName)).join('\n');
        if (mainArg.length > 0) {
            log.cli.title(mainArg, '   ');
        }

        console.log('FULL STACKTRACE:'.magenta.bold);
        log.error(err.stack);

        console.log('_'.times(100) + '\n' + '_'.times(100));
        process.exit(1);
    });

}());