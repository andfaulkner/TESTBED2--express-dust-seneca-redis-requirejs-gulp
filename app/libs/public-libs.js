var levelOfLog = require('config/default').client.levelOfLog;

window = (function(window){
    window._ = require('lodash');
    window.async = require('async');
    window.log = require('loglevel');
    window.log.setLevel(levelOfLog);

    //old jQuery, for purpose of loading and using bootstrap
    (function($) {
        window.log.info('1st block 1st section jQuery version: ' + $.fn.jquery);
        window.jQuery = this.jQuery = $;
    }(jQuery.noConflict(true)));


    return window;

}(window));


}());