//Instantiate & initialize app from Express class
var express = require('express');
var app = express();

//Log - including level to set
var l = require('app/helpers/basicLog')(3, "index.js");

//node modules
var path = require('path');

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