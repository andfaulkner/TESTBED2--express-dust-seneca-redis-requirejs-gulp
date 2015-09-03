var log = require('app/helpers/winston-logger'); //Logging

//Build a new router object
var dashboardRouter = require('express').Router();

/** FIRST POST-LOGIN PAGE */
dashboardRouter.route('/dashboard')
    .get(function(req, res){
        log.log('verbose', req.session.isLoggedIn);
        if (req.session.isLoggedIn === true) {
            res.render('dashboard/tpl-dashboard.dust');
        } else {
            res.writeHead(302, { 'Location': '/login' }); //redirect
            res.end();
        }
    })
    .post( function(req, res, next){
            res.send('Hello World! Pingback from a POST at /dashboard!\n');
            return next();
        }, function(req, res, next){
            log.log('verbose', 'in 2nd route handler!');
            return next();
        }, ((req, res) => (log.log('verbose', 'reaches 3rd route handler?'))));


module.exports = dashboardRouter;