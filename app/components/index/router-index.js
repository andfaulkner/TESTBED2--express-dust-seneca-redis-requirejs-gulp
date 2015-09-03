//Build a new router object
var rootRouter = require("express").Router();


/** INDEX */
rootRouter.route('/')
    .get(function(req, res){
        res.send("Hello World!");
    })
    .post(function(req, res){
        res.send("Hello World! Pingback from a POST!\n");
    });

module.exports = rootRouter;