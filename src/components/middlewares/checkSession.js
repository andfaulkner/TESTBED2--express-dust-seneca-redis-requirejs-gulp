var //TODO extract 300 from function, make a "global" var in config
log$4725 = require('app/helpers/winston-logger');
function writeHeadEnd$4726(res$4727, code$4728, route$4729) {
    res$4727.writeHead(code$4728, { 'Location': route$4729 });
    //redirect
    res$4727.end();
}
/**
 * checkSession
 * Check if a user is currently logged in
 * @param  {Object}   req  - request
 * @param  {Object}   res  - response
 * @param  {Function} next - nodeJS callback
 * @return {Function} redirects user to login page or to next middleware
 */
module.exports = (req$4730, res$4731, next$4732) => req$4730.session.username ? req$4730.redisDb.get('session:username:' + req$4730.session.username, (err$4733, redisRes$4734) => err$4733 ? log$4725.error(err$4733) : !!redisRes$4734 && typeof redisRes$4734 !== 'undefined' ? req$4730.redisDb.expire('session:username:' + req$4730.session.username, 300, (err$4735, res$4736) => next$4732()) : writeHeadEnd$4726(res$4731, 302, '/login')) : //redirect
writeHeadEnd$4726(res$4731, 302, '/login');