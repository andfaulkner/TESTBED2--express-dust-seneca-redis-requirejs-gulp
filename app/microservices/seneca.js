//Logger
var log = require('app/helpers/winston-logger').seneca;
var senlog = ((err, result) => ((err) ? log.error(err) : log.info(result)));

module.exports = (function buildSeneca(){
    var seneca = require('seneca')();

    //register microservices
    seneca.use('app/microservices/plugins/emitStrings_mserv', { option1: "value1"} )
          .use('app/microservices/plugins/math_test_1', { option1: "someoptval1"} )
          .listen(11111);

    //register string actions
    seneca.act('role:emitstr,cmd:hello', senlog);

    return seneca;
}());