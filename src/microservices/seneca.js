var //Logger
log$4551 = require('app/helpers/winston-logger').seneca;
var senlog$4552 = (err$4553, result$4554) => err$4553 ? log$4551.error(err$4553) : log$4551.info(result$4554);
module.exports = (() => require('seneca')().use('app/microservices/plugins/emitHello', { opt1: 'val1' }).use('app/microservices/plugins/math_test_1', { opt1: 'someoptval1' }).listen(11111).act('role:emitstr,cmd:hello', senlog$4552))();