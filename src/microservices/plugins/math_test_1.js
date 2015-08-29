var log$7201 = require('app/helpers/winston-logger').seneca;
var //Logging
_$7202 = require('lodash');
var //******************************* @EXPORT - MODULE *******************************//
math$7203 = function math$7203(options$7204) {
    if (options$7204.debug === true)
        log$7201.info('enters math');
    var //Subtract msg.right from msg.left
    subtract$7205 = (msg$7210, respond$7211) => respond$7211(null, { answer: msg$7210.left - msg$7210.right });
    var //Multiply 2 numbers in message sent: msg.left & msg.right
    multiply$7206 = (msg$7212, respond$7213) => respond$7213(null, { answer: msg$7212.left * msg$7212.right });
    var /**
     * Checks that numbers to sum are finite, runs & gets sum from parent (actual
     * summing) service, attaches initial params to sum, displays sum & info.
     */
    sum$7207 = (msg$7214, respond$7215) => respond$7215(null, { answer: msg$7214.left + msg$7214.right });
    var /**
     * Checks that numbers to sum are finite, runs & gets sum from parent (actual
     * summing) service, attaches initial params to sum, displays sum & info
     */
    sum2$7208 = (msg$7216, respond$7217) => !Number.isFinite(msg$7216.left) || !Number.isFinite(msg$7216.right) ? respond$7217(new Error('Expected left & right to be numbers')) : this.prior({
        role: 'math',
        cmd: 'sum',
        left: msg$7216.left,
        right: msg$7216.right
    }, (err$7218, result$7219) => err$7218 ? respond$7217(err$7218) : respond$7217(null, _$7202.merge({ info: msg$7216.left + '+' + msg$7216.right }, result$7219)));
    this.add('init:math', init$7209);
    //the special initialization pattern
    this.add('role:math,cmd:sum', sum$7207).add('role:math,cmd:sum', sum2$7208).add('role:math,cmd:multiply', multiply$7206).add('role:math,cmd:subtract', subtract$7205);
    function init$7209(msg$7220, respond$7221) {
        if (options$7204.debug === true)
            log$7201.info('** math_test_1.js HAS DEBUG MODE ON **');
        log$7201.info('math initializing!');
        return respond$7221();
    }
    /**
     * Initialization fn run before any other role:math action fn
     */
    this.wrap('role:math', function (msg$7222, respond$7223) {
        if (options$7204.debug === true)
            log$7201.info('in math_test_1 wrap!');
        msg$7222.left = Number(msg$7222.left).valueOf();
        msg$7222.right = Number(msg$7222.right).valueOf();
        this.prior(msg$7222, respond$7223);
    });
};
(math$7224 => process.argv.some(arg$7225 => arg$7225 === 'launch') === true ? require('seneca')().use(math$7224, { debug: true }).act('role:math,cmd:multiply,left:10,right:22', log$7201.info) : null)(math$7203);
module.exports = math$7203;