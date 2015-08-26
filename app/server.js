//Configuration for the Express app
var config = require("app/config/default");

//Launch Seneca microservices
var seneca = require('./microservices/seneca');
seneca = require('./microservices/serviceRunnerTest')(seneca);

//Build Express app itself (loads & runs a constructor module)
var app = require('./index');

var server = app.listen(config.server.port, function(){
    var serveraddress = server.address();
    console.log("example app listening! Bootup complete!");
});