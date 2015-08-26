var config = require("app/config/default");

//Instantiate redis client
var redis = require('redis');
var client = redis.createClient(config.redis.port,
    config.redis.host, config.redis.dbOpts);

//Connect to redis server
client.on('connect', function handleConnectInit() {
    console.log('Connected to Redis!');
    client.set('defaultUser', 'andrew', redis.print);
    client.get('defaultUser', function handleRetDefaultUser(err, reply) {
        if (err) return console.error(err);
        return console.log(reply.toString());
    });
});

module.exports = function(req, res, next){
    req.redisDb = client;
    next();
};