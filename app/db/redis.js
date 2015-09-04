var log = require('app/helpers/winston-logger'); //Logging
var config = require('configs/default');

//Instantiate redis client
var redis = require('redis');
var client = redis.createClient(config.redis.port,
                                config.redis.host,
                                config.redis.dbOpts);

//Connect to redis server
client.on('connect', function handleConnectInit() {
    log.info('Connected to Redis!');
    client.set('defaultUser', 'andrew', redis.print);
    client.get('defaultUser', ((err, reply) =>
        ((err) ?
            log.error(err) :
            log.log('verbose', reply.toString()))));
});

module.exports = ((req, res, next) => {
    req.redisDb = client;
    return next();
});