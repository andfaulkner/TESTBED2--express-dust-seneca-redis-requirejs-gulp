//Logger
var log = require('app/helpers/winston-logger');

module.exports = (function buildSeneca(){
    var seneca = require( 'seneca' )();

    var senlog = function senlog( err, result ) {
        if (err) return log.error( err );
        return log.info(result);
    };

    //register microservices
    seneca.use('app/microservices/plugins/emitStrings_mserv', { option1: "value1"} );

    seneca.use('app/microservices/plugins/math_test_1', { option1: "someoptval1"} )
          .listen(11111);

    //register string actions
    seneca.act('role:emitstr,cmd:hello', senlog);

    return seneca;

}());