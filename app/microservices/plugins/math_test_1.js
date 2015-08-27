//******************************* @EXPORT - MODULE *******************************//
var math = function math(options) {

    if (options.debug === true) console.log("enters math");

    //this === SENECA INSTANCE; allows action fn definition chaining to start
    this
        /**
         * Checks that numbers to sum are finite, runs & gets sum from parent (actual
         * summing) service, attaches initial params to sum, displays sum & info.
         */
        .add('role:math,cmd:sum',
            function(msg, respond) {
                respond(null, { answer: msg.left + msg.right })
            })


        /**
         * Checks that numbers to sum are finite, runs & gets sum from parent (actual
         * summing) service, attaches initial params to sum, displays sum & info
         */
        .add('role:math,cmd:sum',
            function(msg, respond) {

                //Before parent service run
                if (!Number.isFinite(msg.left) || !Number.isFinite(msg.right)) {
                    return respond(new Error("Expected left & right to be numbers"));
                }

                /*______ Runs parent role:math,cmd:sum service ______*/
                this.prior({
                        role: 'math',
                        cmd: 'sum',
                        left: msg.left,
                        right: msg.right,
                    },
                    /*___________________________________________________*/

                    //After parent service run
                    function(err, result) {
                        if (err) return respond(err);
                        result.info = msg.left + "+" + msg.right;
                        respond(null, result); // output
                    });
            })


        /**
         * Multiply 2 numberss in message sent: msg.left & msg.right
         */
        .add('role:math,cmd:multiply',
            function(msg, respond) {
                respond(null, { answer: msg.left * msg.right })
            })


        /**
         * Subtract msg.right from msg.left
         */
        .add('role:math,cmd:subtract',
            function(msg, respond) {
                respond(null, { answer: msg.left - msg.right })
            })


        /**
         * Initialization fn run before any other role:math action fn
         */
        .wrap('role:math', function(msg, respond) {
                if (options.debug === true) console.log('in math_test_1 wrap!');
                msg.left = Number(msg.left).valueOf();
                msg.right = Number(msg.right).valueOf();
                this.prior(msg, respond);
            });
};
//********************************************************************************//


// FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
(function debug(math){
    var hasLaunch = process.argv.some(function(arg){
        if (arg === 'launch') return true;
    });
    if (hasLaunch === true) {
        require('seneca')()
            .use(math, { debug: true })
            .act('role:math,cmd:multiply,left:10,right:22', console.log)
    }
}(math));


module.exports = math;