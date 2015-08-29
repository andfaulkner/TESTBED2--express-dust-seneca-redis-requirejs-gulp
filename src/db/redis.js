var log$667 = require('app/helpers/winston-logger');
var //Logging
config$668 = require('app/config/default');
var //Instantiate redis client
redis$669 = require('redis');
var client$670 = redis$669.createClient(config$668.redis.port, config$668.redis.host, config$668.redis.dbOpts);
//Connect to redis server
client$670.on('connect', function handleConnectInit() {
    log$667.info('Connected to Redis!');
    client$670.set('defaultUser', 'andrew', redis$669.print);
    client$670.get('defaultUser', (err$671, reply$672) => err$671 ? log$667.error(err$671) : log$667.log('verbose', reply$672.toString()));
});
module.exports = (req$673, res$674, next$675) => {
    req$673.redisDb = client$670;
    return next$675();
};