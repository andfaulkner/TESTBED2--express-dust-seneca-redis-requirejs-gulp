(function(){

var log     = require('app/helpers/winston-logger').seneca, //Logging
    _       = require('lodash'),
    colors  = require('colors');


log.info('****** enters stringManipulator.js ******'.bgYellow.black);

var fOrig = function fOrig(){
    log.info('in fOrig!'.bgBlue.black);
};

fOrig();

console.dir(fOrig.prototype);
console.log(this.fOrig);

log.info(fOrig.name);



var top = { };

Object.defineProperty(top, 'fn', {
     writable: true,
     enumerable: true,
     configurable: true,
     name: 'fn',
     value: function(){ log.info('in new function!'.bgBlue.black); }
});

console.log(top.fn);
console.dir(top);
console.log(top.fn.name);


//--------------------------------------------------------------------------------//
//******************************* @EXPORT - MODULE *******************************//
var stringManipulator = function stringManipulator(opt) {

    if (opt.debug === true) log.info('in stringManipulator fn'.bgYellow.black);


    /**
     * INITIALIZATION FUNCTION // {{{ OPTIONAL }}}
     */
    var init = function init(msg, respond){
        if (opt.debug === true) log.info('stringManipulator.js DEBUG MODE ON');
        log.info('stringManipulator initialized!'.bgYellow.black);
        return respond();
    };


    //******************** ACTION FUNCTIONS *********************//
    var fn1 = ((msg, respond) =>
        (respond(null, { answer: msg })));

    var fn2 = function fn2(msg, respond){
        return respond(null, { answer: msg });
    };
    //**********************************************************//


    //ADD ACTION FUNCTIONS TO SENECA
    this.add('init:stringManipulator', init) //special initialization pattern {{{ OPTIONAL }}}
        .add('role:stringManipulator,cmd:fn1', fn1)
        .add('role:stringManipulator,cmd:fn1', fn2)
        .client();  // {{{ OPTIONAL }}}

    //RUNS PRIOR TO EACH ACTION FN CALL  {{{ OPTIONAL }}}
    this.wrap('role:stringManipulator', function(msg, respond) {
        if (opt.debug === true) log.info('in stringManipulator wrap!');
        return (this.prior(_.merge(msg,
                                   { serviceName: "stringManipulator" }),
                           respond));
    });
};
//********************************************************************************//
//--------------------------------------------------------------------------------//


// FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
(((stringManipulator) => {
    return ((process.argv.some( (arg) => (arg === 'launch') ) === true) ?
        require('seneca')()
            .use(stringManipulator, { debug: true })
            .act('role:stringManipulator,cmd:fn1', log.info) :
        null)
})(stringManipulator));


//Export occurs here
module.exports = stringManipulator;

}());
