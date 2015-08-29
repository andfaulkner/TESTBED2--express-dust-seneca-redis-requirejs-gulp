var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var log = require(path.join(__dirname, '../app/helpers/winston-logger')).seneca;
var async = require('async');
var _ = require('lodash');


var conf = {
    titles: ['math_test_1', 'stringManipulator'],
    uServiceBasePath: path.join(__dirname, '../app/microservices/plugins/')
};

var uServices = {};

var buildCmd = ((title, uServiceBasePath, grepToInclude, grepToExclude) =>
    ('gnome-terminal --title=SENECA_' + title.toUpperCase() + ' ' + '-x nodemon ' +
         conf.uServiceBasePath + title + '.js' + ' launch ' +  '--seneca.log.all ' +
         ((grepToInclude) ? ' | grep -i ' + grepToInclude +
                            ' --line-buffered' : '') +
         ((grepToExclude) ? ' | grep -V ' + grepToExclude +
                            ' --line-buffered' : '')));

log.info(conf.uServiceBasePath);

log.info(buildCmd(conf.titles[0], conf.uServiceBasePath));


//**************************** SINGLE SPAWN ****************************//
//register service events
var uServiceEventSetup = function uServiceEventSetup(uService, cb) {
    uService.stdout.on('data', (data) => (log.info('output: ' + data)));

    // Send data to the child process via its stdin stream
    uService.stdin.write("Hello there!");

    uService.stdout.on('data', (data) => console.log('stdout: ' + data));
    uService.stderr.on('data', (data) => (console.log('stderr: ' + data)));

    uService.on('close', (code) => (console.log('child process exited with code ' + code)));
    uService = uServices[uService];

    cb(null, uService);
};


/**
 * Launches a single microservice - at location 'uPath'
 * @param  {String}   uPath  - path to the uService to launch
 * @param  {Function} cb     - run fn when uService done launch;; cb(err, val)
 * @return {[type]}         [description]
 */
var spawn_uService = function spawn_uService(uPath, cb){
    // var cmd = buildCmd(title, conf.uServiceBasePath);
    var uServ = spawn('gnome-terminal',
                     [
                       '--title=SENECA__' + path.basename(uPath, 'js'),
                       '-x',
                       'nodemon',
                       uPath,
                       'launch',
                       '--seneca.log.all'
                     ], {
                        env: process.env,
                        cwd: process.cwd()
                    });
    // var uServ = spawn('gnome-terminal', [
    //                   '--title=' + title,
    //                   '-x',
    //                   'nodemon',
    //                   'app/microservices/plugins/' + title + '.js',
    //                   'launch',
    //                   '--seneca.log.all'
    //                ],
    //               { env: process.env, cwd: process.cwd() });

    uServiceEventSetup(uServ);

    // var mathChild = spawn(cmd, { env: process.env, cwd: process.cwd() });

    //___________________________________________________________________________//
    // Kill the child midway through its sleep. - {{{FOR TESTING}}}
    setTimeout(() => {
        uServ.kill();
    }, 5000);
    cb(null, 'end of spawn uService section');
    //___________________________________________________________________________//
};

//Check for existence of a file
fileExists(conf.uServiceBasePath, (str) => {
    var cmd = buildCmd(title, conf.uServiceBasePath);
    log.info(str);
});


//
// Launch each uService one after another
//
async.each(conf.titles, function(title){

    log.debug(title);

    //___WATERFALL START __//
    async.waterfall([

        //SET OF ACTIONS TO TAKE IN SEQUENCE
        function wf1(next){
            return next(null, 'data');
        },
        function wf2(data, next){
            return next(null, 'data2');
        },
        function wf3(data, next){
            return next(null, 'data3');
        }
        //_________________________________

    //Run when an  individual microservice launches
    ], function spawn_wfComplete(err, result){
        if (err) return log.error('spawn_wfComplete ERR: ' + err) ;
        log.info('spawn_wfComplete SUCCESS: ' + result)

    }); //___WATERFALL END __//

}); //___EACH END___//

// //Excutes when ALL microservices have run & been initialized
// }, function eachCallback(args){
//     //put an event here?
//     return log.info('end of including microservices each!');
// });


// //********************************************************************//

// var fileExists = (filePath, callback) =>
//     (fs.stat(filePath, (err, stats) =>
//         ((err) ? callback('new Error("callback failed!")', false) : callback(stats.isFile()))));


// //  (1) check that service file exists
// //  (2) spawn a process file from the service
// //  (3) load event listeners for process file



// //LOAD EACH MICROSERVICE
// async.each(conf.titles, (title) => {


//     // async.waterfall([

//         // _.partial(fileExists, )

//         // function checkForScript()

//         fileExists(conf.uServiceBasePath, (str) => {
//             var cmd = buildCmd(title, conf.uServiceBasePath);
//             log.info(str);

//             uServices[title] = spawn(cmd, { env: process.env, cwd: process.cwd() });
//                 // (err, stdout, stderr) => {
//                 //     if (err) return log.error('spawn error: ' + err);
//                 //     log.info('spawn bash cmd: ' + cmd);
//                 //     log.info('stdout: ' + stdout);
//                 //     log.info('stderr: ' + stderr);
//                 //     log.info('spawn successful!');
//                 // }
//         });
//         // ]

// //If all microservices launch successfully...
// }, (err) => {
//     if (err) return log.error('error loading services: ' + err);
//     return log.info('all services opneed successfully');
// });


// spawn('node -v', function(error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//         console.log('spawn error: ' + error);
//     }
// });