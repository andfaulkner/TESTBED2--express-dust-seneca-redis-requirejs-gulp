//Log - including level to set
var log = require('app/helpers/winston-logger'); //Logging

//NODE & npm MODULES
var cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    passport = require('passport');


module.exports = ((app) =>
    (app.use(cookieParser())     //Cookie parsing; Must precede redis middleware

        //Create a session
        .use(session({
            secret: '123698774',
            saveUninitialized: false,
            resave: false,
            store: new RedisStore({
                host:'127.0.0.1',
                port:9999,
                ttl: 300,
                prefix:'testbed-sess'
            })
        }))
        .use(passport.initialize())
        .use(passport.session())

        //Registers the db as a middleware - accessible everywhere via req.redisDb
        .use(require('app/db/redis'))

        //TEST THAT REQUEST OCCURRED WITH SESSION INFO
        .use(/^((?!public)[\s\S])*$/, function(req, res, next){  //for all but /public route
            log.log('debug', req.session);
            log.log('debug', 'request occurred. req.session present? ' +
                             ((req.session) ? true : false));
            return next();
        })
));