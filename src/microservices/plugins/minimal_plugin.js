var log$7235 = require('app/helpers/winston-logger').seneca;
//Logging
// function minimal_plugin(options){
//     return log.info(options);
// }
require('seneca')().use(options$7236 => log$7235.info(options$7236), { foo: 'bar' });