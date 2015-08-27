(function(){

//node modules
var fs = require('fs');
var path = require('path');
var winston = require('winston');

var config = require('../config/default').winstonLogs;

//Asynchronously check if a file exists
//TODO Make part of a utilities module
var fileExists = function fileExists(filePath, callback){
    return fs.stat(filePath, (err, stats) => {
        if (err) return callback(false);
        return callback(stats.isFile());
    });
};

//Get all log file paths, create each log file that doesn't exist
Object.keys(config.transport).forEach(function(key){
    var logFile;

    if (typeof config.transport[key].filename !== 'undefined') {
        logFile = config.transport[key].filename;

        //Checks if the log file exists, creates it if not
        fileExists(logFile, function(isFile){
            if (isFile !== false) return console.log(logFile + " exists!");

            fs.writeFile(logFile, "", function(err){
                if (err) return console.log("creating " + logFile + "failed");
                return console.log("creating " + logFile + " succeeded!");
            });

        });

    }
});

// var fileTransportFactory = function(logLvl, logFilePath){
//     return new winston.transports.File({
//         level:logLvl,
//         filename: path.join(__dirname, '../../logs', logFilePath),
//         handleExceptions: true,
//         json: true,
//         maxsize: 5242880, //5MB
//         maxFiles: 5,
//         colorize: false
//     });
// }

//Creates logging object
var logger = new winston.Logger({
    transports: [   //specify appenders here

        // //EXCESSIVE DATA LOG
        // fileTransportFactory('silly', 'excessive-data-log.log'),
        // fileTransportFactory('info', 'all-logs.log'),


        new winston.transports.File({
                level: 'silly',
                filename: path.join(__dirname, '../../logs/excessive-data-log.log'),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
        new winston.transports.File({
                level: 'info',
                filename: path.join(__dirname, '../../logs/all-logs.log'),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
        new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
    ],
    exitOnError: config.exitOnError
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
}())