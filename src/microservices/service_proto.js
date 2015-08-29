(function () {
    var log$4578 = require('app/helpers/winston-logger').seneca, //Logging
        _$4579 = require('lodash'), colors$4580 = require('colors');
    log$4578.info('****** enters stringManipulator.js ******'.bgYellow.black);
    var fOrig$4581 = function fOrig$4581() {
        log$4578.info('in fOrig!'.bgBlue.black);
    };
    fOrig$4581();
    console.dir(fOrig$4581.prototype);
    console.log(this.fOrig);
    log$4578.info(fOrig$4581.name);
    var top$4582 = {};
    Object.defineProperty(top$4582, 'fn', {
        writable: true,
        enumerable: true,
        configurable: true,
        name: 'fn',
        value: function () {
            log$4578.info('in new function!'.bgBlue.black);
        }
    });
    console.log(top$4582.fn);
    console.dir(top$4582);
    console.log(top$4582.fn.name);
    var //--------------------------------------------------------------------------------//
    //******************************* @EXPORT - MODULE *******************************//
    stringManipulator$4583 = function stringManipulator$4583(opt$4584) {
        if (opt$4584.debug === true)
            log$4578.info('in stringManipulator fn'.bgYellow.black);
        var /**
     * INITIALIZATION FUNCTION // {{{ OPTIONAL }}}
     */
        init$4585 = function init$4585(msg$4588, respond$4589) {
            if (opt$4584.debug === true)
                log$4578.info('stringManipulator.js DEBUG MODE ON');
            log$4578.info('stringManipulator initialized!'.bgYellow.black);
            return respond$4589();
        };
        var //******************** ACTION FUNCTIONS *********************//
        fn1$4586 = (msg$4590, respond$4591) => respond$4591(null, { answer: msg$4590 });
        var fn2$4587 = function fn2$4587(msg$4592, respond$4593) {
            return respond$4593(null, { answer: msg$4592 });
        };
        //**********************************************************//
        //ADD ACTION FUNCTIONS TO SENECA
        this.add('init:stringManipulator', init$4585).add('role:stringManipulator,cmd:fn1', fn1$4586).add('role:stringManipulator,cmd:fn1', fn2$4587).client();
        // {{{ OPTIONAL }}}
        //RUNS PRIOR TO EACH ACTION FN CALL  {{{ OPTIONAL }}}
        this.wrap('role:stringManipulator', function (msg$4594, respond$4595) {
            if (opt$4584.debug === true)
                log$4578.info('in stringManipulator wrap!');
            return this.prior(_$4579.merge(msg$4594, { serviceName: 'stringManipulator' }), respond$4595);
        });
    };
    (stringManipulator$4596 => {
        return process.argv.some(arg$4597 => arg$4597 === 'launch') === true ? require('seneca')().use(stringManipulator$4596, { debug: true }).act('role:stringManipulator,cmd:fn1', log$4578.info) : null;
    })(stringManipulator$4583);
    //Export occurs here
    module.exports = stringManipulator$4583;
}());