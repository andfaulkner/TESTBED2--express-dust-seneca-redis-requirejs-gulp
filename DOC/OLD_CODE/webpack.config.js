/**
 * Webpack configuration for module handling
 */
var path = require('path');
var async = require('async');
var _      = require('lodash');
var webpack = require('webpack');
var log = require('app/helpers/winston-logger');

console.log('__dirname is currently: ' + __dirname);
console.log('path.join(__dirname, "node_modules") evaluates to: ' + path.join(__dirname, 'node_modules'));

var fs = require('fs');

//GET PATHS FOR ALL
var getDirs = function getDirs(rootDir, getDirsNext) {

    console.log('enters getDirs');

    async.waterfall([

        function wf1(wfnext){
            fs.readdir(rootDir, function(err, files) {
                return (err) ? wfnext(err.message) : wfnext(null, files);
            });
        },

        function wf2(files, wfnext){
            var dirs = [];

            async.each(files, function(file, eachnext) {
                if (file === '.' || file === '..') return eachnext(null);

                fs.stat(path.join(rootDir, file), function(err, stat) {
                    if (err) return eachnext(err);
                    if (stat.isDirectory()) dirs.push(file);
                    return eachnext(null);
                });

            }, function(err) {
                return (err) ? wfnext(err.message) : wfnext(null, dirs);
            });

        },

        function wf3(dirs, wfnext){
            console.log('__wf3__');
            console.log(dirs);
            async.map(dirs, function(dir, mapnext){
                console.log('__async.map__');
                console.log(path.join('app/components', dir, '/') + 'client-' + dir);
                return mapnext(null, path.join('app/components', dir, '/') + 'client-' + dir);
            }, function mapLast(err, filepaths) {
                console.log('mapLast');
                console.log(filepaths);
                return (err) ? wfnext(err) : wfnext(null, filepaths);
            });
        },

        function wf4(filepaths, wfnext){
            var pathObjsArr = [];
            async.each(filepaths, function wf4each(curpath, eachnext){
                var dir = _.last(curpath.split('-'));
                var outpath = path.join('components', dir, '/') + 'client-' + dir;
                console.log('______wf4__async.each__dir::______');
                console.log(dir);
                pathObjsArr.push({ name:dir, entry: curpath, output: outpath });
                // pathObjsArr[dir] = { entry: curpath, output: outpath };
                console.dir(pathObjsArr);
                eachnext();
            }, function wf4eachLast(err){
               console.log('______wf4eachLast__pathObjsArr::______');
               console.dir(pathObjsArr);
               return (err) ? wfnext(err) : wfnext(null, pathObjsArr);
            });
        }

    ], function wfLast(err, pathObjsArr){
        console.log('__wfLast__');
        console.log(pathObjsArr);
        return (err) ? getDirsNext(err) : getDirsNext(null, pathObjsArr);
    });
};

getDirs(path.join(__dirname, 'app', 'components'), console.log);

//     fs.readdir(rootDir, function(err, files) {
//         var dirs = [];
//         var file, filePath;
//         for (var index = 0; index < files.length; ++index) {
//             file = files[index];
//             if (file[0] !== '.') {
//                 filePath = rootDir + '/' + file;
//                 fs.stat(filePath, function(err, stat) {
//                     if (stat.isDirectory()) dirs.push(file);
//                     if (files.length === (index + 1)) return cb(dirs);
//                 });
//             }
//         }
//     });
// };

(function getPaths(next){
    getDirs('app/components/', function(err, pathObjsArr){
        console.log('*********pathObjsArr in filePaths ***************');
        console.dir(pathObjsArr);
        var dirObj = { };
        pathObjsArr.forEach(function(pathObj){
           console.log('*********IN EACH: pathObj ***************');
           console.dir(pathObj);
           dirObj[pathObj.output] = pathObj.entry;
           console.log('*********IN EACH: dirObj ***************');
           console.dir(dirObj);
//           dirObj.entries[pathObj.name] = pathObj.entry;
        });
        // pathObjsArr.forEach(function(pathObj){
        //     console.log('*********IN EACH: pathObj ***************');
        //     console.dir(pathObj);
        //     dirObj.outputs[pathObj.name] = pathObj.output;
        // });
        console.log('*********dirObj in filePathObjFn ***************');
        console.dir(dirObj);
        next(dirObj);
    });
    // _.merge(webpackConfig, entryObj);
    // var allCmpDirs = path;
    // var components = 'app/components/';
    // var clientPrefix = '/client-';

    // return _.pluck( {
    //     dashboard: components + 'dashboard' + clientPrefix + 'dashboard',
    //     // index: components + 'index',
    //     // login: components + 'login',
    //     // vendor: ['jquery', 'lodash'],
    //     // page2: ['./entry1', './entry2']
    // };
}(exporter));



console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ FILEPATHS RETURN ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ");
console.dir(filePaths());
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ");

function exporter(directoriesObj) {

    console.log("|||");
    console.log("ENTERED EXPORTER!!!");
    console.log("DIRECTORIES OBJ DIRECTLY INSIDE EXPORTER!!!!");
    console.log("|||");
    console.dir(directoriesObj);

module.exports = {

    //location from which all other routes are derived - base path
    context: __dirname,

    //entry point, from which compilation occurs by pulling in modules based on require calls
    // entry: {
    //     app: './app/server.js', //TODO make this the frontend entry point
    // },


    //Single file to output bundle to //TODO should be multiples
    // output: {
    //     path: path.join(__dirname, './www/js'),
    //     filename: 'app.js'
    // },

    // entry: {
    //    'components/dashboard/client-dashboard': 'app/components/dashboard/client-dashboard',
    //    'components/index/client-index': 'app/components/index/client-index',
    //    'components/login/client-login': 'app/components/login/client-login'
    // },

    entry: {
          'components/dashboard/client-dashboard': 'app/components/dashboard/client-dashboard',
          'components/index/client-index': 'app/components/index/client-index',
          'components/login/client-login': 'app/components/login/client-login'
      },

    output: {
        path: path.join(__dirname, '.build'),
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: '[name].bundle.js'
    },

    //Handle SCSS files - convert to CSS //TODO make this work with '.less' files
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass?indentedSyntax=sass'
        }]
    },

    //compile for use in a browser environment
    target: 'web',

    //Keep going even if an error occurs
    bail: false,

    //Rebuild when any file pointed to changes
    watch: true,

    //Find libraries in the following locations
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        fallback: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules'],
    },

    debug: true,

    plugins: [

        //Remove duplicate JS code
        new webpack.optimize.DedupePlugin(),

        // new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main']),

        //make the following globally available
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            _: 'lodash',
            async: 'async'
        })

//        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main']),
        //          new BowerWebpackPlugin({
        //              excludes: /.*\.less/,
        //              modulesDirectories: ['bower_components'], */
    ],
};
}