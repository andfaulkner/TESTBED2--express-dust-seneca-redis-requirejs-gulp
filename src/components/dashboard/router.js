var log$4638 = require('app/helpers/winston-logger');
var //Logging
//Build a new router object
dashboardRouter$4639 = require('express').Router();
/** FIRST POST-LOGIN PAGE */
dashboardRouter$4639.route('/dashboard').get(function (req$4640, res$4641) {
    log$4638.log('verbose', req$4640.session.isLoggedIn);
    if (req$4640.session.isLoggedIn === true) {
        res$4641.render('dashboard/index.dust');
    } else {
        res$4641.writeHead(302, { 'Location': '/login' });
        //redirect
        res$4641.end();
    }
}).post(function (req$4642, res$4643, next$4644) {
    res$4643.send('Hello World! Pingback from a POST at /dashboard!\n');
    return next$4644();
}, function (req$4645, res$4646, next$4647) {
    log$4638.log('verbose', 'in 2nd route handler!');
    return next$4647();
}, (req$4648, res$4649) => log$4638.log('verbose', 'reaches 3rd route handler?'));
module.exports = dashboardRouter$4639;