//Log - including level to set
var l = require('app/helpers/basicLog')(2, "session.js");

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

    //create a session
    app.use(session({
        secret: '123698774',
        saveUninitialized: false,
        resave: false
    }));

    //launch redis database
    app.use(require('app/db/redis'));

    //TEST THAT REQUEST OCCURRED WITH SESSION INFO
    app.use(/^((?!public)[\s\S])*$/, function(req, res, next){ //for all but /public route
        l.dir(req.session);
        l.log('request occurred. req.session present? ' + ((req.session) ? true : false));
        next();
    });

    return app;
};
