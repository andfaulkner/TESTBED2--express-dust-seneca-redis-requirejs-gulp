var spawn = require('child_process').spawn,
    path = require('path'),
    fs = require('fs'),
    log = require(path.join(__dirname, '../app/helpers/winston-logger')).seneca,
    async = require('async'),
    _ = require('lodash');

var countExceptions = 0;

process.addListener('uncaughtException', function (e) {
  log.error('!!!! UNCAUGHT EXCEPTION !!!! NUMBER: ' + (++countExceptions));
  log.error('message::: ' + e.message);
  console.dir(e);
  log.error('end of uncaught exception number: ' + countExceptions);
});


/**
 * Configuration for microservices - including which to launch
 * @type {Object}
 */
const conf = {
    titles: ['math_test_1.js', 'stringManipulator.js'],
    uServiceBasePath: path.join(__dirname, '../app/microservices/plugins/')
};

// list containing all registered microservices
var uServices = {};

var buildCmd = ((title, uServiceBasePath, grepToInclude, grepToExclude) =>
    ('gnome-terminal --title=SENECA_' + title.toUpperCase() + ' ' + '-x nodemon ' +
         conf.uServiceBasePath + title + '.js' + ' launch ' +  '--seneca.log.all ' +
         ((grepToInclude) ? ' | grep -i ' + grepToInclude +
                            ' --line-buffered' : '') +
         ((grepToExclude) ? ' | grep -V ' + grepToExclude +
                            ' --line-buffered' : '')));

//log.info(conf.uServiceBasePath);
//log.info(buildCmd(conf.titles[0], conf.uServiceBasePath));


//**************************** SINGLE SPAWN ****************************//
//register service events
var uServiceEventSetup = function uServiceEventSetup(uService, next) {
    log.debug('in uServiceEventSetup!');
    uService.stdout.on('data', (data) => (log.info('output: ' + data)));

    // Send data to the child process via its stdin stream
    uService.stdin.write('Hello there!');

    uService.stdout.on('data', (data) => console.log('stdout: ' + data));
    uService.stderr.on('data', (data) => (console.log('stderr: ' + data)));

    uService.on('close', (code) => (console.log('child process exited with code ' + code)));
    // uServices[uService] = uService;

    log.debug('uServiceEventSetup: before return!');
    return (next) ? next(null, uService) : uService;
};


/**
 * Launches a single microservice - at location 'uPath' - returns new process
 * @param  {String}   uPath  - path to the uService to launch
 * @param  {Function} next   - run fn when uService done launch;; cb(err, spawned process)
 * @return {Function} next fn given null (no err) and spawned child process
 */
var spawn_uService = function spawn_uService(uPath, next) {

    return spawn('gnome-terminal', [
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

    // // var cmd = buildCmd(title, conf.uServiceBasePath);
    // return next(null, spawn('gnome-terminal', [
    //                         '--title=SENECA__' + path.basename(uPath, 'js'),
    //                         '-x',
    //                         'nodemon',
    //                         uPath,
    //                         'launch',
    //                         '--seneca.log.all'
    //                     ], {
    //                         env: process.env,
    //                         cwd: process.cwd()
    //                     }));
};

    //next should be uServiceEventSetup(uServ)
    //___________________________________________________________________________//
    // Kill the child midway through its sleep. - {{{FOR TESTING}}}
    // setTimeout(() => {
    //     uServ.kill();
    // }, 5000);
    // cb(null, 'end of spawn uService section');
    //___________________________________________________________________________//
// };



log.info('about to enter async.each');
//___________________________________________________________________________//
//___________________________________________________________________________//
//
// TODO :: INCOMPLETE
// Launch each uService one after another
//
async.each(conf.titles, function(title, each_next){
    //TODO create error object for uService === null
    //TODO come up with other error objects

    log.info('in async.each!');
    log.debug(title);

    //___WATERFALL START __//
    async.waterfall([

        //
        //SET OF ACTIONS TO TAKE IN SEQUENCE
        //

        //launch a process
        function wf1_launchSenecaService(next){
            log.info('in wf1!');
            var uPath = path.join(conf.uServiceBasePath, title);
            // var new_uService = spawn_uService(uPath);
            //     // spawn('gnome-terminal', [
            //     //             '--title=SENECA__' + path.basename(uPath, 'js'),
            //     //             '-x', 'nodemon', uPath, 'launch', '--seneca.log.all'
            //     //         ], {
            //     //             env: process.env,
            //     //             cwd: process.cwd()
            //     //         });
            // log.log('debug', 'wf1: is uService still an object? ' + typeof new_uService.pid === 'number');
            // // console.dir(new_uService);
            // log.info('at wf1 end!');
            //TODO place error object for uService === null here
            next(null, spawn_uService(uPath));
        },

        //attach event listeners to process
        function wf2_attachEventListeners(uService, next){
            log.info('in wf2!');
            // log.log('debug', 'wf2: is uService still an object? ' + typeof uService.pid === 'number');
            // log.info('wf2: before uService passed to uServiceEventSetup!');
            // uService = uServiceEventSetup(uService);
            // log.info('before wf2 return!');
            // log.debug('wf2: is uService still an object? ' + typeof uService.pid === 'number');
            //TODO place error object for uService === null here
            next(null, uServiceEventSetup(uService));
        },

        //provide API to communicate with process
        function wf3(uService, next){
            log.info('in wf3!');
            log.log('debug', 'wf3: is uService still an object? ' + typeof uService.pid === 'number');
            log.info(uService.pid);
            //TODO place error object for uService === null here
            next(null, uService);
        }
        //_________________________________

    //Run when an  individual microservice launches
    ], function spawn_wfComplete(err, uService){
        if (err) {
            log.error('spawn_wfComplete ERR: ' + err);
            each_next(err);
        }
        log.info('spawn_wfComplete SUCCESS: uService: ' + uService);
        each_next(null);
    }); //___WATERFALL END __//

//___EACH ITERATOR END___//
}, function(err){
    if(err) {
        log.error('EACH FAILED WITH ERROR: ' + err);
        return;
    }
    log.info('EACH SUCCEEDED! ALL PROCESSES ARE NOW LOADED');
    return;
});

log.log('debug', 'reached end of file!');

        // each_next(null, uService);

//___EACH CALLBACK END___//
//___________________________________________________________________________//
//___________________________________________________________________________//





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