//Set to 0 to make no logs display
var levelOfLog$4607 = 1;
var /*
 * For merging each separate require.config object with a "common RequireJS config
 * properties" object. Meant to avoid e.g. baseUrl, common libs etc. between the 2
 * (lodash cannot be used for this, as it's not yet loaded until all this completes)
 */
mergeObjs$4608 = function mergeObjs$4608(objIn1$4612, objIn2$4613) {
    var conglomerateObj$4614 = {};
    Object.keys(objIn1$4612).forEach(function (item$4615) {
        conglomerateObj$4614[item$4615] = objIn1$4612[item$4615];
    });
    return function mergeIn(o1$4616, o2$4617) {
        Object.keys(o2$4617).forEach(function (k$4618) {
            if (typeof o1$4616[k$4618] === 'undefined') {
                o1$4616[k$4618] = o2$4617[k$4618];
            } else if (typeof o1$4616[k$4618] === 'object' && typeof o2$4617[k$4618] === 'object') {
                o1$4616[k$4618] = mergeIn(o1$4616[k$4618], o2$4617[k$4618]);
            }
        });
        return o1$4616;
    }(conglomerateObj$4614, objIn2$4613);
};
var //**************************** REQUIRE.CONFIG OBJECTS ****************************//
reqCommon$4609 = {
    baseUrl: '../scripts',
    paths: {
        lodash: '../public/lodash/lodash',
        bootstrap: '../public/bootstrap/js/bootstrap.min',
        loglevel: '../public/loglevel.min'
    }
};
var req1$4610 = require.config(mergeObjs$4608({
    context: 'version1',
    paths: { jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min' }
}, reqCommon$4609));
var req2$4611 = require.config(mergeObjs$4608({
    context: 'version2',
    paths: { jquery: '../public/jquery' }
}, reqCommon$4609));
//********************************************************************************//
//****************************** BOOTSTRAP LAUNCHER ******************************//
//Anything using jQuery v 1.11.3 - mainly Bootstrap
req1$4610([
    'loglevel',
    'jquery'
], function (log$4619) {
    log$4619.setLevel(levelOfLog$4607);
    (function ($$4620) {
        log$4619.info('1st block 1st section jQuery version: ' + $$4620.fn.jquery);
        window.jQuery = this.jQuery = $$4620;
        req1$4610(['bootstrap'], function (bootstrap$4621) {
            log$4619.info('1st block 2nd section: bootstrap loaded! jQuery version: ' + $$4620.fn.jquery);
        });
    }(jQuery.noConflict(true)));
});
//********************************************************************************//
//Anything using jQuery v 2.1.4
req2$4611([
    'loglevel',
    'lodash',
    'jquery'
], function (log$4622, _$4623) {
    log$4622.setLevel(levelOfLog$4607);
    (function ($$4624) {
        log$4622.info('2nd block jQuery version: ' + $$4624.fn.jquery);
        //#############################################################################//
        //################################ CORE APP ###################################//
        //#############################################################################//
        req2$4611([
            'test-modules/main',
            'test-modules/testaddedjsfile',
            'test-modules/obj-lit-only',
            'test-modules/obj-lit-and-setup-fn'
        ], function (main$4625, ta$4626, objLitOnly$4627, objLitAndSetupFn$4628) {
            log$4622.info('loaded inner req2 block');
            log$4622.info(objLitOnly$4627.key1);
        });
    }(jQuery.noConflict(true)));
});