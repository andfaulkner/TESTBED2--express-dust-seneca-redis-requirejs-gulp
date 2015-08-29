(function () {
    var log$7246 = require('app/helpers/winston-logger').seneca, //Logging
        _$7247 = require('lodash'), colors$7248 = require('colors');
    log$7246.info('****** enters stringManipulator.js ******'.bgYellow.black);
    var //--------------------------------------------------------------------------------//
    //******************************* @EXPORT - MODULE *******************************//
    stringManipulator$7249 = function stringManipulator$7249(opt$7250) {
        if (opt$7250.debug === true)
            log$7246.info('in stringManipulator fn'.bgYellow.black);
        var /**
     * INITIALIZATION FUNCTION // {{{ OPTIONAL }}}
     */
        init$7251 = function init$7251(msg$7254, respond$7255) {
            if (opt$7250.debug === true)
                log$7246.info('stringManipulator.js DEBUG MODE ON');
            log$7246.info('stringManipulator initialized!'.bgYellow.black);
            return respond$7255();
        };
        var //******************** ACTION FUNCTIONS *********************//
        fn1$7252 = (msg$7256, respond$7257) => respond$7257(null, { answer: msg$7256 });
        var fn2$7253 = function fn2$7253(msg$7258, respond$7259) {
            return respond$7259(null, { answer: msg$7258 });
        };
        //**********************************************************//
        //ADD ACTION FUNCTIONS TO SENECA
        this.add('init:stringManipulator', init$7251).add('role:stringManipulator,cmd:fn1', fn1$7252).add('role:stringManipulator,cmd:fn1', fn2$7253).client();
        // {{{ OPTIONAL }}}
        //RUNS PRIOR TO EACH ACTION FN CALL  {{{ OPTIONAL }}}
        this.wrap('role:stringManipulator', function (msg$7260, respond$7261) {
            if (opt$7250.debug === true)
                log$7246.info('in stringManipulator wrap!');
            return this.prior(_$7247.merge(msg$7260, { serviceName: 'stringManipulator' }), respond$7261);
        });
    };
    (stringManipulator$7262 => {
        return process.argv.some(arg$7263 => arg$7263 === 'launch') === true ? require('seneca')().use(stringManipulator$7262, { debug: true }).act('role:stringManipulator,cmd:fn1', log$7246.info) : null;
    })(stringManipulator$7249);
    //Export occurs here
    module.exports = stringManipulator$7249;
}());