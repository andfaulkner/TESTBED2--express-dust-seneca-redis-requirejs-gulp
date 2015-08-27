var log = require('app/helpers/winston-logger'); //Logging

//Configuration for the Express app
var config = require("app/config/default");

//Launch Seneca microservices
var seneca = require('./microservices/serviceRunnerTest')
                    (require('./microservices/seneca'));

var app = require('./index'); //Build Express app itself (loads & runs a constructor module)

var server = app.listen(config.server.port, (() =>
    (log.info("example app listening! Bootup done!"))));