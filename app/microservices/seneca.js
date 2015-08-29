//Logger
var log = require('app/helpers/winston-logger').seneca;
var senlog = ((err, result) => ((err) ? log.error(err) : log.info(result)));

module.exports = ((() =>
    (require('seneca')()

        //register microservices
        .use('app/microservices/plugins/emitHello', { opt1: 'val1'})
        .use('app/microservices/plugins/math_test_1', { opt1: 'someoptval1'})
        .listen(11111)

        //register string actions
        .act('role:emitstr,cmd:hello', senlog)
))());