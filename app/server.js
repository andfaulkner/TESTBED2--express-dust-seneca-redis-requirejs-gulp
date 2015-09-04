var http = require('http');
http.globalAgent.maxSockets = Infinity;
Error.stackTraceLimit = Infinity;

require('app/helpers/uncaught-error-handler');

var log = require('app/helpers/winston-logger'); //Logging

//Configuration for the Express app
var config = require('app/config/default');

//Launch Seneca microservices
var seneca = (require('./microservices/serviceRunnerTest')
                     (require('./microservices/seneca')));

//Build Express app itself (loads & runs a constructor module), serves over web
var server = require('./index')                              // "app"
    .listen(config.server.port, (() =>
        (log.info('example app listening! Bootup done!')))); // server