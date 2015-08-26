var l = require('app/helpers/basicLog')(3, "dashboard router.js:");

//Build a new router object
var dashboardRouter = require('express').Router();

/** FIRST POST-LOGIN PAGE */
dashboardRouter.route('/dashboard')
    .get(function(req, res){
        l.log(req.session.isLoggedIn);
        if (req.session.isLoggedIn === true) {
            res.render('dashboard/index.dust');
        } else {
            res.writeHead(302, { 'Location': '/login' }); //redirect
            res.end();
        }
    })
    .post( function(req, res, next){
            res.send('Hello World! Pingback from a POST at /dashboard!\n');
            next();
        }, function(req, res, next){
            console.log('in 2nd route handler!');
            next();
        }, function(req, res){
            console.log('reaches 3rd route handler?');
    });


module.exports = dashboardRouter;