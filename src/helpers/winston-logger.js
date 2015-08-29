(function () {
    var //node modules
    fs$732 = require('fs');
    var path$733 = require('path');
    var winston$734 = require('winston');
    var lodash$735 = require('lodash');
    var colors$736 = require('colors');
    var config$737 = require('../config/default').winstonLogs;
    var //TODO this is not DRY - the filenames are declared twice
    logFileNames$738 = [
        'excessive-data-log.log',
        'all-logs.log',
        'console-log-record.log'
    ];
    var //***************************** UTILITIES *****************************//
    //Asynchronously check if a file exists
    //TODO Make part of a utilities module
    fileExists$739 = (filePath$742, callback$743) => fs$732.stat(filePath$742, (err$744, stats$745) => err$744 ? callback$743(false) : callback$743(stats$745.isFile()));
    //Get all log file paths, create each log file that doesn't exist
    logFileNames$738.forEach(function (logFileName$746) {
        var logFile$747 = path$733.join(__dirname, '../../logs', logFileName$746);
        return //Checks if the log file exists, creates it if not
        fileExists$739(logFile$747, isFile$748 => isFile$748 !== false ? console.log(logFile$747 + ' exists!') : fs$732.writeFile(logFile$747, '', err$749 => err$749 ? console.log('creating ' + logFile$747 + 'failed') : console.log('creating ' + logFile$747 + ' succeeded!')));
    });
    var //*********************************************************************//
    //*************************** BASIC LOGGERS ***************************//
    //Builds transports into specific files
    fileTransportFactory$740 = (logLvl$750, nm$751, logFilePath$752, loggerTypeLabel$753) => new winston$734.transports.File({
        label: loggerTypeLabel$753,
        name: nm$751,
        level: logLvl$750,
        filename: path$733.join(__dirname, '../../logs', logFilePath$752),
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        //5MB
        maxFiles: 5,
        colorize: false
    });
    var //Creates logging object
    logger$741 = function (loggerTypeLabel$754, consoleLvl$755) {
        loggerTypeLabel$754 = loggerTypeLabel$754 || '';
        var timeStamp$756 = function timeStamp$756() {
            var date$757 = new Date(Date.now());
            var mon$758 = date$757.getMonth() > 9 ? date$757.getMonth() : '0' + date$757.getMonth(), dtOfMon$759 = date$757.getDate() > 9 ? date$757.getDate() : '0' + date$757.getDate(), hr$760 = date$757.getHours() > 9 ? date$757.getHours() : '0' + date$757.getHours(), min$761 = date$757.getMinutes() > 9 ? date$757.getMinutes() : '0' + date$757.getMinutes(), sec$762 = date$757.getSeconds() > 9 ? date$757.getSeconds() : '0' + date$757.getSeconds();
            return ('|' + mon$758 + '/' + dtOfMon$759 + '--' + hr$760 + ':' + min$761 + ':' + sec$762 + '|').gray.bold;
        };
        return new winston$734.Logger({
            transports: [
                new //specify appenders here
                //DATA --> CONSOLE
                winston$734.transports.Console({
                    label: loggerTypeLabel$754,
                    level: consoleLvl$755,
                    timestamp: timeStamp$756,
                    handleExceptions: true,
                    json: false,
                    colorize: true
                }),
                //COMPLETE (EXCESSIVE) DATA --> FILE LOG
                fileTransportFactory$740('silly', 'silly-log', 'excessive-data-log.log', loggerTypeLabel$754),
                //INFO --> FILE LOG
                fileTransportFactory$740('info', 'info-log', 'all-logs.log', loggerTypeLabel$754),
                //CONSOLE --> FILE LOG
                fileTransportFactory$740(consoleLvl$755, 'console-log', 'console-log-record.log', loggerTypeLabel$754)
            ],
            exitOnError: config$737.exitOnError
        });
    };
    //*********************************************************************//
    //***************************** EXPORTS ******************************//
    module.exports = logger$741('', config$737.consoleLogLevel);
    module.exports.seneca = logger$741('seneca'.bgBlack.green.bold, config$737.senecaLogLevel);
    module.exports.stream = { write: (message$763, encoding$764) => logger$741().info(message$763) };
}());