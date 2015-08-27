(function(){

//node modules
var fs = require('fs');
var path = require('path');
var winston = require('winston');
var lodash = require('lodash');
var colors = require('colors');

var config = require('../config/default').winstonLogs;

//TODO this is not DRY - the filenames are declared twice
var logFileNames = ['excessive-data-log.log', 'all-logs.log', 'console-log-record.log'];

//***************************** UTILITIES *****************************//
//Asynchronously check if a file exists
//TODO Make part of a utilities module
var fileExists = (filePath, callback) =>
    fs.stat(filePath, (err, stats) =>
        ((err) ? callback(false):
                 callback(stats.isFile())));

//Get all log file paths, create each log file that doesn't exist
logFileNames.forEach(function(logFileName){
    var logFile = path.join(__dirname, '../../logs', logFileName);

    //Checks if the log file exists, creates it if not
    return fileExists(logFile, (isFile) =>
        ((isFile !== false) ?
            console.log(logFile + ' exists!') :
            fs.writeFile(logFile, '', ((err) =>
                (err) ? console.log('creating ' + logFile + 'failed') :
                        console.log('creating ' + logFile + ' succeeded!')))));
});
//*********************************************************************//


//*************************** BASIC LOGGERS ***************************//
//Builds transports into specific files
var fileTransportFactory = ((logLvl, nm, logFilePath, loggerTypeLabel) =>
    new (winston.transports.File)({
        label: loggerTypeLabel,
        name: nm,
        level:logLvl,
        filename: path.join(__dirname, '../../logs', logFilePath),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
}));

//Creates logging object
var logger = function(loggerTypeLabel, consoleLvl){
    loggerTypeLabel = loggerTypeLabel || '';

    var timeStamp = function timeStamp() {
        var date = new Date(Date.now());
        var mon = (date.getMonth() > 9) ? date.getMonth() : '0' + date.getMonth(),
            dtOfMon = (date.getDate() > 9) ? date.getDate() : '0' + date.getDate(),
            hr = (date.getHours() > 9) ? date.getHours() : '0' + date.getHours(),
            min = (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes(),
            sec = (date.getSeconds() > 9) ? date.getSeconds() : '0' + date.getSeconds();

        return ('|' + mon + '/' + dtOfMon + '--' +
                hr + ':' + min + ':' + sec + '|').gray.bold;
    };

    return new (winston.Logger)({
        transports: [   //specify appenders here

            //DATA --> CONSOLE
            new winston.transports.Console({
                label: loggerTypeLabel,
                level: consoleLvl,
                timestamp: timeStamp,
                handleExceptions: true,
                json: false,
                colorize: true,
            }),

            //COMPLETE (EXCESSIVE) DATA --> FILE LOG
            fileTransportFactory('silly', 'silly-log',
                'excessive-data-log.log', loggerTypeLabel),

            //INFO --> FILE LOG
            fileTransportFactory('info', 'info-log',
                'all-logs.log', loggerTypeLabel),

            //CONSOLE --> FILE LOG
            fileTransportFactory(consoleLvl, 'console-log',
                'console-log-record.log', loggerTypeLabel)

        ],

        exitOnError: config.exitOnError
    });
};
//*********************************************************************//


//***************************** EXPORTS ******************************//
module.exports = logger('', config.consoleLogLevel);

module.exports.seneca = logger('seneca'.bgBlack.green.bold, config.senecaLogLevel);

module.exports.stream = {
    write: (message, encoding) =>
        (logger().info(message))
};
//********************************************************************//

}());