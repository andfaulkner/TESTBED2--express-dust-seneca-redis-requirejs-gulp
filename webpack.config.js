/**
 * Webpack configuration for module handling
 */
var path = require('path');
var async = require('async');
var _      = require('lodash');
var webpack = require('webpack');
var log = require('app/helpers/winston-logger');
var fs = require('fs');
require('dustjs-linkedin/dist/dust-core');


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
        loaders: [
            { test: /\.scss$/, loader: 'style!css!sass?indentedSyntax=sass' },
            { test: /\.dust$/, loader: 'dust-loader' }
        ]
    },

    //compile for use in a browser environment
    target: 'web',

    //Keep going even if an error occurs
    bail: false,

    //Rebuild when any file pointed to changes
    watch: false,

    //Find libraries in the following locations
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        fallback: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules'],
    },

    debug: false,

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