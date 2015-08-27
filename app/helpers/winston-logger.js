(function(){

//node modules
var fs = require('fs');
var winston = require('winston');

var config = require('../config/default').winstonLogs;

//Asynchronously check if a file exists
//TODO Make part of a utilities module
var fileExists = function fileExists(filePath, callback){
    fs.stat(filePath, (err, stats) => {
        if (err) return callback(false);
        return callback(stats.isFile());
    });
}

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

//Creates logging object
var logger = new winston.Logger({
    transports: [   //specify appenders here
        new winston.transports.File(config.transport.file),
        new winston.transports.Console(config.transport.console)
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