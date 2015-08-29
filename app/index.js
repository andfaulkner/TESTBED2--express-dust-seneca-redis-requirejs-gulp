//INSTANTIATE & INITIALIZE APP FROM EXPRESS CLASS
var express = require('express');
var app = express();

//NODE (NATIVE & npm) MODULES
var log = require('app/helpers/winston-logger'), //Logging
    dust = require('express-dustjs'), //compile dust templates
    seneca = require('seneca')(),
    path = require('path');

//************************* SENECA *************************//
//register Seneca client - for math actions
seneca.client(11111)

      //Perform math actions
      .act( 'role:math,cmd:sum,' + 'left:123,right:27',
            log.seneca.info)
      .act('role:math,cmd:multiply,' + 'left:10,right:5',
           log.seneca.info);
//**********************************************************//

//************************* PUBLIC ROUTES *************************//
//Serve css & js libraries under "public" route
app.use('/public', express.static(__dirname + '/libs'));
//*****************************************************************//

//*****************************************************************************//
//------------------------ EXPRESS MIDDLEWARES STACK --------------------------//
//Export app object as it runs through the middlewares
module.exports =
  //SESSIONS, COOKIES, DB CONNECTS
  require('app/db/session')(app)

    //Serve client-side scripts under "scripts" route
    .use('/scripts', express.static(__dirname + '/components/clientscripts'))
//****************************** VIEWS *******************************//
    // Use Dustjs as Express view engine, with dustjs-helpers
    .engine('dust', dust.engine({ useHelpers: true }))

    //dir app will recursively search for compilable template views
    .set('views', path.join(__dirname, 'components'))
    .set('view engine', 'dust')
//********************************************************************//
//************************** AUTHENTICATION **************************//
    .use(require('app/components/login/router'))      //login page router
    .use(require('app/components/middlewares/checkSession'))
//********************************************************************//
//****************************** ROUTES ******************************//
    .use(require('app/components/index/router'))      //index (no path) router
    .use(require('app/components/dashboard/router')); //dashboard router
//********************************************************************//
//-----------------------------------------------------------------------------//
//*****************************************************************************//