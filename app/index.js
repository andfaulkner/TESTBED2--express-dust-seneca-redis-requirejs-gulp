//Instantiate & initialize app from Express class
var express = require('express');
var app = express();
var seneca = require('seneca')();

var log = require('app/helpers/winston-logger'); //Logging

//node modules
var path = require('path');

//register Seneca client - for math actions
seneca.client(11111)
      .act('role:math,cmd:sum,' + 'left:123,right:27', log.info)
      .act('role:math,cmd:multiply,' + 'left:10,right:5', log.info);

//*************************** PUBLIC ROUTES ***************************//
//Serve css & js libraries under "public" route
app.use('/public', express.static(__dirname + '/libs'));
//*********************************************************************//


//******************* PRELOGIN ONWARD MIDDLEWARES *********************//
// Compile dust templates
var dust = require('express-dustjs');

//SESSIONS, COOKIES, DB CONNECTS
app = require('app/db/session')(app);
//********************************************************************//

//Serve client-side scripts under "scripts" route
app.use('/scripts', express.static(__dirname + '/components/clientscripts'));

//****************************** VIEWS *******************************//
// Use Dustjs as Express view engine
app.engine('dust', dust.engine({
    // Use dustjs-helpers
    useHelpers: true
}));

//provides dir the app will recursively search for template views to compile
app.set('views', path.join(__dirname, 'components'));
app.set('view engine', 'dust');
//********************************************************************//

app.use(require('app/components/login/router'));

// load 'index', 'login', and 'postlogin dashboard' routers into app
app.use(require('app/components/middlewares/checkSession'));

//****************************** ROUTES ******************************//
app.use(require('app/components/index/router'));
app.use(require('app/components/dashboard/router'));
//********************************************************************//


module.exports = app;