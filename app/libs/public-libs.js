var levelOfLog = require('configs/default').client.levelOfLog;

var $, jQuery;

window.$ = window.jQuery = $ = jQuery = require('./jquery-1.11.3-min');
require('./bootstrap/js/bootstrap');
// require('./bootstrap/css/bootstrap.css');
// require('./bootstrap/css/bootstrap-theme.min.css');
// var window = window;    //stfu linter

window = (function(window){

    window._ = require('lodash');
    window.async = require('async');

    window.log = require('loglevel');
    window.log.setLevel(levelOfLog);


    // //old jQuery, for purpose of loading and using bootstrap
    // (function($) {
    //     window.log.info('1st block 1st section jQuery version: ' + $.fn.jquery);
    //     window.jQuery = this.jQuery = $;
    // }(jQuery.noConflict(true)));

   return window;

}(window));