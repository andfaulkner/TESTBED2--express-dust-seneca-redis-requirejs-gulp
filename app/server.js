//Build Express app itself (loads & runs a constructor module)
var app = require('./index');

//Configure the Express app
var config = require("app/config/default");

var server = app.listen(config.server.port, function(){
    var serveraddress = server.address();
    console.log("example app listening! Bootup complete!");
});