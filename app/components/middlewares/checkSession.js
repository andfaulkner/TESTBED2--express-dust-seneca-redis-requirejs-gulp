var l = require('app/helpers/basicLog')(1, "checkSession");

var checkSession = function checkSession(req, res, next){

    if (req.session.username) {

        req.redisDb.get('session:username:' + req.session.username, function(err, redisRes){
            if (err) {
                l.err(err);
            }
            l.log(typeof redisRes);
            if (!!redisRes && typeof redisRes !== 'undefined'){
                //TODO extract 300, make a "global" var in express
                req.redisDb.expire('session:username:' + req.session.username, 300, function(err, res){
                    next();
                });
            } else {
                res.writeHead(302, { 'Location': '/login' }); //redirect
                res.end();
            }
        });
    } else {
        res.writeHead(302, { 'Location': '/login' }); //redirect
        res.end();
    }
};

module.exports = checkSession;