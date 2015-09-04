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
app.use('/public', express.static(__dirname + '/libs'));
//*****************************************************************//



//*****************************************************************************//
//------------------------ EXPRESS MIDDLEWARES STACK --------------------------//
//Export app object as it runs through the middlewares
module.exports =
  //SESSIONS, COOKIES, DB CONNECTS
  require('app/db/session')(app)

    //Serve compiled assets (e.g. dust templates) within .build folder
    .use(serveStatic(__dirname + '/../.build'))

    //Serve client-side scripts under "scripts" route
    .use('/scripts', express.static(__dirname + '/clientscripts'))
//****************************** VIEWS *******************************//
    // Use Dust as Express view engine, w adaro for prerendered; dustjs-helpers for postrendered
    .engine('js', adaro.js({
        'stream': false
    }))
    .engine('dust', adaro.dust({
        'stream': false
    }))
    // dust.engine({ useHelpers: true }))

    //dir app will recursively search for compilable template views
    .set('views', path.join(__dirname, 'components'))
    .set('view engine', 'js')
    .set('view engine', 'dust')

//********************************************************************//
//************************** AUTHENTICATION **************************//
    .use(require('app/components/login/router-login'))      //login page router
    .use(require('app/middlewares/checkSession'))
//********************************************************************//
//****************************** ROUTES ******************************//
    .use(require('app/components/index/router-index'))      //index (no path) router
    .use(require('app/components/dashboard/router-dashboard')); //dashboard router
//********************************************************************//
//-----------------------------------------------------------------------------//
//*****************************************************************************//