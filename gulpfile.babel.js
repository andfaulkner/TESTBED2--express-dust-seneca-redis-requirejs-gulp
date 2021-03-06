var gulp = require('gulp');

//NODE MODULES & JS LIBRARIES
var path    = require('path'),
    fs      = require('fs-extra'),
    yargs   = require('yargs'),
    merge   = require('merge2'),
    _       = require('lodash'),
    del     = require('del'),
    async   = require('async');

require('shelljs/global');

//ECMA 6 POLYFILL
require('babel/register');
Object.getPrototypeOf.toString = function() {
    return Object.toString();
};

//------------------------------- PLUGINS --------------------------------//
//PACKAGED GULP PLUGINS --- AVAILABLE VIA 'p.nameOfPackage'
var p = require('gulp-packages')(gulp, [
    'autoprefixer',             // prefix css for multiple browsers
    'babel',                    // compile ECMA6 --> ECMA5
    'debug',                    // lists all files run thru it
    'dev',                      // Toggle html comments on & off
    'display-help',             // Display help file
    'dust',                     // Compile Dust templates
    'express',                  // Launch express framework
    'exit',                     // Force quit Gulp process
    'filter',                   // Filter out unwanted files from stream
    'if-else',                  // if-else statements mid-stream
    'jshint',                   // display Javascript errors
    'newer',                    // Only push item through pipe if newer
    'livereload',               // Relaunch in browser automatically
    'nodemon',                  // Keep server running - restart on crash
    'notify',                   // Tells you if a reload happens
    'plumber',                  // keep running if error occurs
    'print',                    // output errors to console
    'rename',                   // Rename files
    'replace',                  // find-and-replace text in files
    'requirejs-optimize',
    'rimraf',                   // remove files
    'sass',                     // compile scss and sass --> css
    'shell',                    // run shell commands with gulp
    'size',                     // output file size
    'stats',                    // provides stats on files passed thru stream
    'tap',                      // run function mid-stream
    'webpack'                   // compile webpack
]);

//UNPACKAGEABLE GULP PLUGINS
var gutil = require('gulp-util');
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var wait = require('gulp-wait');
//------------------------------------------------------------------------//

//------------------------------ CONSTANTS -------------------------------//
var SRC = {
};

var DEST = {

};
//------------------------------------------------------------------------//


//------------------ COMMAND LINE PARAMETER HANDLING ---------------------//
//Command line flags accepted by gulp
var cmds = ['test', 'production', 'stats', 'once'];

/**
 * Populate args object w/ command line args, setting each that was received to
  * true in the args object, & all others to false. Referenced by argument name.
  * @example args.production set to true if gulp launched w/ gulp --production.
  */
var args = (function populateArgs(argList, argObj){
    argList.forEach(function createArgObjFromArgArray(arg){
        argObj[arg] = (yargs.argv[arg] === true);
    });
    return argObj;
}(cmds, {}));
//------------------------------------------------------------------------//

//------------------------------ UTILITIES ------------------------------//
/**
 * Output webpack errors when caught.
 */
var onError = function onError(err) {
    gutil.beep();
    console.log(gutil.colors.red.bgWhite('-----------------------------------'));
    console.log('ERROR OCCURRED');
    console.log(typeof err);
    console.log(gutil.colors.red.bgWhite(err.toString()));
    console.log(gutil.colors.red.bgWhite('-----------------------------------'));
    this.emit('restart');
    this.emit('end');
};

var fileExists = function fileExists(filePath, callback){
    fs.stat(filePath, (err, stats) => {
        if (err) return callback(false);
        return callback(stats.isFile());
    });
}

//------------------------------------------------------------------------//


//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~ REUSABLE PIPE COMPONENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
var catchErrors = lazypipe()
    .pipe(p.plumber, { errorHandler: onError });

var consoleTaskReport = lazypipe()
    .pipe(catchErrors)
    .pipe(p.print);

var newerThanRootIfNotProduction = lazypipe()
    .pipe(p.ifElse, !args.production, p.newer.bind(this, DEST));


//
// Lightweight templates for removing debug code when production flag set
//
// Removes single-line sections of javascript bookended by: /*<%*/  and  /*%>*/
// E.g.  /*<%*/ console.log("this line of JS gets removed"); /*%>*/
// Removes multiline js blocks bookended by: /*<{{DEBUG*/  and  /*DEBUG}}>*/
//                                    ...OR: /*<{{TEST*/   and   /*TEST}}>*/
//
var rmDebugCode = lazypipe()
    .pipe(p.ifElse, !!args.production,
        p.replace.bind(this, /\/\*<\%.*\%\>\*\//g, ''))
    .pipe(p.ifElse, !!args.production,
        p.replace.bind(this, /\/\*<\{\{DEBUG\*\/[\s\S]*?\/\*DEBUG\}\}\>\*\//gm, ''))
    .pipe(p.ifElse, !!args.production,
        p.replace.bind(this, /\/\*<\{\{TEST\*\/[\s\S]*?\/\*TEST\}\}\>\*\//gm, ''));
//#################################################################################


//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LIVERELOAD SERVER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
gulp.task('server', function livereloadServer(){
    livereload.listen();                    // listen for changes
    return consoleTaskReport()
        .pipe(p.nodemon({                       // configure nodemon
            script: 'build/bin/launcher.js',    // the script to run the app
            ext: 'js dust json css scss sass html htm png jpg gif hbs ejs rb xml xsl jpeg avi mp3 mp4 mpg py txt env'

        }).on('restart', () => {
           livereload.listen();
           return gulp.src('build/bin/launcher.js')   // when the app restarts, run livereload.
                .pipe(consoleTaskReport())
                .pipe(p.tap(() => {
                    console.log('\n' + gutil.colors.white.bold.bgGreen('\n' +
                    '     .......... RELOADING PAGE, PLEASE WAIT ..........\n'));
                }))
                .pipe(notify({message: 'RELOADING PAGE, PLEASE WAIT', onLast: true}))
                .pipe(wait(1500))
                .pipe(livereload());
        }));

    });
//################################################################################


//################################################################################
//#~~~~~~~~~~~~~~~~~ CONVERT COMMONJS LIBS TO AMD FOR REQUIREJS ~~~~~~~~~~~~~~~~~~
//################################################################################
gulp.task('requirejs', function(){
    return gulp.src('./')
    })


//################################################################################


gulp.task('watch', function(){
    gulp.watch([SRC + '**/*.*', path.join(__dirname, 'config/**/*.*')], () =>
        runSequence('makeRoutes', 'build'));
});
