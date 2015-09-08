//INSTANTIATE & INITIALIZE APP FROM EXPRESS CLASS
var express = require('express');
var app = express();

//NODE (NATIVE & npm) MODULES
var log = require('app/helpers/winston-logger'), //Logging
    dust = require('express-dustjs'), //compile dust templates
    seneca = require('seneca')(),
    adaro = require('adaro'),
    path = require('path');
var serveStatic = require('serve-static');

//************************* SENECA TESTS *************************//
//register Seneca client to communicate w microservices, try some actions w it
seneca.client({ port:11111, host:'localhost', type:'tcp' })

      //Perform math actions
      .act( 'role:math,cmd:sum,' + 'left:123,right:27',
            log.seneca.info)
      .act('role:math,cmd:multiply,' + 'left:10,right:5',
           log.seneca.info);
//****************************************************************//

//************************* PUBLIC ROUTES *************************//
//Serve css & js libraries under "public" route
app.use('/public', express.static(path.join(__dirname, '..', '.build', 'public')));
    //Serve global client-side scripts
    // .use(serveStatic(__dirname + '/../.build/public'));

//*****************************************************************//



//*****************************************************************************//
//------------------------ EXPRESS MIDDLEWARES STACK --------------------------//
//Export app object as it runs through the middlewares
module.exports =
  //SESSIONS, COOKIES, DB CONNECTS
  require('app/db/session')(app)

//****************************** VIEWS *******************************//

    // Use Dust as Express view engine, w adaro for prerendered; dustjs-helpers for postrendered
    .engine('dust', adaro.dust({ 'stream': false }))
    .set('view engine', 'dust')

    //recursively search for compilable template views, serve them
    .set('views', path.join(__dirname, 'components'))

//********************************************************************//
//************************** AUTHENTICATION **************************//
    .use(require('app/components/login/router-login'))      //login page router
    .use(require('app/middlewares/checkSession'))
//********************************************************************//
    .use('/components', express.static(path.join(__dirname, '..', '.build', 'components')))

//****************************** ROUTES ******************************//
    .use(require('app/components/index/router-index'))      //index (no path) router
    .use(require('app/components/dashboard/router-dashboard')); //dashboard router
//********************************************************************//
//-----------------------------------------------------------------------------//
//*****************************************************************************//