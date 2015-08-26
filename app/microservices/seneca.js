module.exports = (function buildSeneca(){
    var seneca = require( 'seneca' )();

    var senlog = function senlog( err, result ) {
        if (err) return console.error( err );
        return console.log(result);
    }

    seneca
        //register microservices
        .use('app/microservices/plugins/emitStrings_mserv', { option1: "value1"} )
        .use('app/microservices/plugins/math_test_1', { option1: "someoptval1"} )

        //register math actions
        .act('role:math,cmd:sum,' + 'left:123,right:27', senlog)
        .act('role:math,cmd:multiply,' + 'left:10,right:5', senlog)

        //register string actions
        .act('role:emitstr,cmd:hello', senlog)

    return seneca;

}());