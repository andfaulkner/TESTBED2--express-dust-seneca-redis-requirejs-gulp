var //Build a new router object
rootRouter$4659 = require('express').Router();
/** INDEX */
rootRouter$4659.route('/').get(function (req$4660, res$4661) {
    res$4661.send('Hello World!');
}).post(function (req$4662, res$4663) {
    res$4663.send('Hello World! Pingback from a POST!\n');
});
module.exports = rootRouter$4659;