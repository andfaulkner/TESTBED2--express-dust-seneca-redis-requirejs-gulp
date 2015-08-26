
var dbOpts = {
    no_ready_check: false
};

//Instantiate redis client
var redis = require('redis');
var client = redis.createClient(9999, '127.0.0.1', dbOpts);

//Connect to redis server
client.on('connect', function handleConnectInit() {
    console.log('Connected to Redis!');
    client.set('defaultUser', 'andrew', redis.print);
    client.get('defaultUser', function handleRetDefaultUser(err, reply) {
        if (err) throw err;
        console.log(reply.toString());
    });
});

// module.exports = client;

module.exports = function(req, res, next){
    req.redisDb = client;
    next();
};