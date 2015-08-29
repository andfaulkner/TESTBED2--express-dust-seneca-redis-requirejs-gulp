var log$654 = require('app/helpers/winston-logger');
var //Logging
//Configuration for the Express app
config$655 = require('app/config/default');
var //Launch Seneca microservices
seneca$656 = require('./microservices/serviceRunnerTest')(require('./microservices/seneca'));
var //Build Express app itself (loads & runs a constructor module), serves over web
server$657 = require('./index').listen(config$655.server.port, () => log$654.info('example app listening! Bootup done!'));