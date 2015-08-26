//Set to 0 to make no logs display
var levelOfLog = 1;

/*
 * For merging each separate require.config object with a "common RequireJS config
 * properties" object. Meant to avoid e.g. baseUrl, common libs etc. between the 2
 * (lodash cannot be used for this, as it's not yet loaded until all this completes)
 */
var mergeObjs = function mergeObjs(objIn1, objIn2) {
    var conglomerateObj = {};
    Object.keys(objIn1).forEach(function(item) {
        conglomerateObj[item] = objIn1[item];
    });

    return (function mergeIn(o1, o2) {
        Object.keys(o2).forEach(function(key) {
            if (typeof o1[key] === 'undefined') {
                o1[key] = o2[key];
            } else if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
                o1[key] = mergeIn(o1[key], o2[key]);
            }
        });
        return o1;
    }(conglomerateObj, objIn2));
};


//**************************** REQUIRE.CONFIG OBJECTS ****************************//
var reqCommon = {
    baseUrl: '../scripts',
    paths: {
        lodash: '../public/lodash/lodash',
        bootstrap: '../public/bootstrap/js/bootstrap.min',
        loglevel: '../public/loglevel.min'
    }
};

var req1 = require.config(mergeObjs({
    context: 'version1',
    paths: { jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min' }
}, reqCommon));

var req2 = require.config(mergeObjs({
    context: 'version2',
    paths: { jquery: '../public/jquery' }
}, reqCommon));
//********************************************************************************//


//****************************** BOOTSTRAP LAUNCHER ******************************//
//Anything using jQuery v 1.11.3 - mainly Bootstrap
req1(['loglevel', 'jquery'], function(log) {
    log.setLevel(levelOfLog);
    (function($) {
        log.info('1st block 1st section jQuery version: ' + $.fn.jquery);
        window.jQuery = this.jQuery = $;
        req1(['bootstrap'], function(bootstrap) {
            log.info("1st block 2nd section: bootstrap loaded! jQuery version: " + $.fn.jquery);
        });
    }(jQuery.noConflict(true)));
});
//********************************************************************************//

//Anything using jQuery v 2.1.4
req2(['loglevel', 'lodash', 'jquery'], function(log, _){
    log.setLevel(levelOfLog);

    (function($) {
        log.info('2nd block jQuery version: ' + $.fn.jquery);

        req2(['main',
              'testaddedjsfile',
              'obj-lit-only'], function(main, ta, objLitOnly) {
            log.info("loaded inner req2 block");
            log.info(objLitOnly.key1);
        });

    }(jQuery.noConflict(true)));

});