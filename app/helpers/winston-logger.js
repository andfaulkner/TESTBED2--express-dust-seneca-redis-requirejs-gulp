(function(){

//node modules
var fs = require('fs');
var path = require('path');
var winston = require('winston');

var config = require('../config/default').winstonLogs;

//TODO this is not DRY - the filenames are declared twice
var logFileNames = ['excessive-data-log.log', 'all-logs.log'];

//Asynchronously check if a file exists
//TODO Make part of a utilities module
var fileExists = function fileExists(filePath, callback){
    fs.stat(filePath, (err, stats) => {
        if (err) return callback(false);
        return callback(stats.isFile());
    });
};

//Get all log file paths, create each log file that doesn't exist
logFileNames.forEach(function(logFileName, index){
    var logFile = path.join(__dirname, '../../logs', logFileName);

    //Checks if the log file exists, creates it if not
    return fileExists(logFile, function(isFile) {
        if (isFile !== false) return console.log(logFile + " exists!");

        fs.writeFile(logFile, "", function(err) {
            if (err) return console.log("creating " + logFile + "failed");
            return console.log("creating " + logFile + " succeeded!");
        });

    });
});

//Builds transports into specific files
var fileTransportFactory = function(logLvl, nm, logFilePath){
    return new (winston.transports.File)({
        name: nm,
        level:logLvl,
        filename: path.join(__dirname, '../../logs', logFilePath),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    });
};

//Creates logging object
var logger = new winston.Logger({
    transports: [   //specify appenders here
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        //COMPLETE (EXCESSIVE) DATA --> FILE LOG
        fileTransportFactory('silly', 'silly-log', 'excessive-data-log.log'),
        //INFO --> FILE LOG
        fileTransportFactory('info', 'info-log', 'all-logs.log')
    ],
    exitOnError: config.exitOnError
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

}());