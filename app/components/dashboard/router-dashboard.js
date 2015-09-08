//NODE MODULES
var log = require('app/helpers/winston-logger'); //Logging
var dust = require('dustjs-helpers');

//Build a new router object
var dashboardRouter = require('express').Router();


/** FIRST POST-LOGIN PAGE */
dashboardRouter.route('/dashboard')

    .get(function(req, res){
        log.log('verbose', req.session.isLoggedIn);
        if (req.session.isLoggedIn === true) {
          //*****PRECOMPILATION FAIL --- return to issue later*****//
            // dust.render(dashTplName, { title: 'Dashboard'}, function(err, renderedTpl) {
                // if (err) throw err;
                // res.writeHead(200);
                // res.send(renderedTpl);
            // });
            // res.render('dashboard/client-dashboard.bundle.js');
            // res.render(require('build/components/dashboard/client-dashboard.bundle.js');
            res.render('dashboard/tpl-dashboard.dust', {componentName: 'dashboard'});
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
        }, ((req, res) =>
                (log.log('verbose', 'reaches 3rd route handler?'))));


module.exports = dashboardRouter;