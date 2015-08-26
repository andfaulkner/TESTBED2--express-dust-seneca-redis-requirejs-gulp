//Log - including level to set
var l = require('app/helpers/basicLog')(3, "session.js");

var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('node-uuid');

var redis   = require("redis");
var RedisStore = require('connect-redis')(session);

module.exports = function setupSessionHandling(app){

    var hasSession;
    var sessionId;

    //Cookie parsing. Must come before redis middleware.
    // app.use(cookieParser());

    //Registers the db as a middleware - accessible everywhere via req.redisDb
    var redisClient = require('app/db/redis');

    // var redisStoreOptions = {
    //     host: 'localhost',
    //     port: 9999,
    //     prefix: 'logins',
    //     disableTTL: false,
    //     db: 1,
    //     // pass: '123698774',   // password to redis
    //     unref: true,
    // };

    // var redisStore = new RedisStore(redisStoreOptions);

    // redisStore.on('get', function(sid, next){
    //     l.log(sid);
    //     next();
    // }


    //create a session
    app.use(session({
        secret: '123698774',
        // // create new redis store.
        // store: new RedisStore({
        //     host: 'localhost',
        //     port: 9999,
        //     client: redis.createClient(),
        //     ttl:  120
        // }),
        saveUninitialized: false,
        resave: false
    }));

    // app.use(session({
    //     secret: '123698774',
    //     resave: false,
    //     name: "sessionid",
    //     saveUninitialized: false,
    //     genid: function(req) {
    //         var uuidBuff, sessionId;
    //         if (!hasSession) {
    //             uuidBuff = new Buffer(32); // (or 'new Buffer' in node.js)
    //             hasSession = true;
    //             uuid.v4(null, uuidBuff, 0);
    //             uuid.v4(null, uuidBuff, 16);
    //             sessionId = uuid.unparse(uuidBuff);
    //             l.log(sessionId);
    //             return sessionId; // use UUIDs for session IDs
    //         }
    //     },
    //     // store: redisStore,
    //     cookie: { secure: true }
    // }));

    app.use(require('app/db/redis'));

    //TEST COOKIE REGISTRATION
    app.use(/^((?!public)[\s\S])*$/, function(req, res, next){ //for all but /public route
        l.dir(req.session);
        // req.session.destroy();
        next();
    });

    return app;
};
