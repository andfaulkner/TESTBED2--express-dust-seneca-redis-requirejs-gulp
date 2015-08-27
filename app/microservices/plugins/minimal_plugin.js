var log = require('app/helpers/winston-logger'); //Logging

function minimal_plugin(options){
    log.info(options);
}

require('seneca')()
    .use( minimal_plugin, {foo:'bar'});