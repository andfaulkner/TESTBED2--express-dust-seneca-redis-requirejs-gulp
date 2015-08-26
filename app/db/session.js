//Log - including level to set
var l = require('app/helpers/basicLog')(2, "session.js");

var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('node-uuid');

var redis   = require("redis");
var RedisStore = require('connect-redis')(session);
var passport = require('passport');

module.exports = function setupSessionHandling(app){

    var hasSession, sessionId;

    //Registers the db as a middleware - accessible everywhere via req.redisDb
    var redisClient = require('app/db/redis');

    app
        // Cookie parsing. Must come before redis middleware.
        .use(cookieParser())

        //create a session
        .use(session({
            secret: '123698774',
            saveUninitialized: false,
            resave: false,
            // cookie: {
            //     expires: new Date(Date.now() + 5 * 1000 * 60 )
            // },
            store: new RedisStore({
                host:'127.0.0.1',
                port:9999,
                ttl: 300,
                prefix:'testbed-sess'
            })
        }))
        .use(passport.initialize())
        .use(passport.session())

        //launch redis database
        .use(require('app/db/redis'));

    //TEST THAT REQUEST OCCURRED WITH SESSION INFO
    app.use(/^((?!public)[\s\S])*$/, function(req, res, next){ //for all but /public route
        l.dir(req.session);
        l.log('request occurred. req.session present? ' + ((req.session) ? true : false));
        next();
    });

    return app;
};
