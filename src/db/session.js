var //Log - including level to set
log$685 = require('app/helpers/winston-logger');
var //Logging
    //NODE & npm MODULES
    cookieParser$686 = require('cookie-parser'), session$687 = require('express-session'), RedisStore$688 = require('connect-redis')(session$687), passport$689 = require('passport');
module.exports = app$690 => app$690.use(cookieParser$686()).use(session$687({
    secret: '123698774',
    saveUninitialized: false,
    resave: false,
    store: new RedisStore$688({
        host: '127.0.0.1',
        port: 9999,
        ttl: 300,
        prefix: 'testbed-sess'
    })
})).use(passport$689.initialize()).use(passport$689.session()).use(require('app/db/redis')).use(/^((?!public)[\s\S])*$/, function (req$691, res$692, next$693) {
    //for all but /public route
    log$685.log('debug', req$691.session);
    log$685.log('debug', 'request occurred. req.session present? ' + (req$691.session ? true : false));
    return next$693();
});