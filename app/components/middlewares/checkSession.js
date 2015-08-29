//TODO extract 300 from function, make a "global" var in config

var log = require('app/helpers/winston-logger'); //Logging

/**
 * Allows writeHead and end to be called in a single statement.
 * route example: '/path/goes/here'
 */
function writeHeadEnd(res, code, route){
    res.writeHead(code, { 'Location': route }); //redirect
    res.end();
}

/**
 * checkSession
 * Check if a user is currently logged in
 * @param  {Object}   req  - request
 * @param  {Object}   res  - response
 * @param  {Function} next - nodeJS callback
 * @return {Function} redirects user to login page or to next middleware
 */
module.exports = ((req, res, next) =>
    (((req.session.username) ?
        req.redisDb.get('session:username:' + req.session.username,
          ((err, redisRes) =>
            ((err) ?
                (log.error(err)) :
                ((!!redisRes && typeof redisRes !== 'undefined') ?
                    (req.redisDb.expire('session:username:' + req.session.username,
                                        300,
                                        //Next middleware runs from here
                                        ((err, res) => next()))) :
                    (writeHeadEnd(res, 302, '/login')))))) : //redirect
        (writeHeadEnd(res, 302, '/login')))));               //redirect


// var checkSession = function checkSession(req, res, next){

//     if (req.session.username) {

//         req.redisDb.get('session:username:' + req.session.username, function(err, redisRes){
//             if (err) return log.error(err);
//             log.info(typeof redisRes);
//             if (!!redisRes && typeof redisRes !== 'undefined'){
//                 //TODO extract 300, make a "global" var in express
//                 req.redisDb.expire('session:username:' + req.session.username, 300, function(err, res){
//                     next();
//                 });
//             } else {
//                 res.writeHead(302, { 'Location': '/login' }); //redirect
//                 res.end();
//             }
//         });
//     } else {
//         res.writeHead(302, { 'Location': '/login' }); //redirect
//         res.end();
//     }
// };

// module.exports = checkSession;