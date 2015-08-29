var //INSTANTIATE & INITIALIZE APP FROM EXPRESS CLASS
express$639 = require('express');
var app$640 = express$639();
var //NODE (NATIVE & npm) MODULES
    log$641 = require('app/helpers/winston-logger'), //Logging
    dust$642 = require('express-dustjs'), //compile dust templates
    seneca$643 = require('seneca')(), path$644 = require('path');
//************************* SENECA *************************//
//register Seneca client - for math actions
seneca$643.client(11111).act('role:math,cmd:sum,' + 'left:123,right:27', log$641.seneca.info).act('role:math,cmd:multiply,' + 'left:10,right:5', log$641.seneca.info);
//**********************************************************//
//************************* PUBLIC ROUTES *************************//
//Serve css & js libraries under "public" route
app$640.use('/public', express$639.static(__dirname + '/libs'));
//*****************************************************************//
//*****************************************************************************//
//------------------------ EXPRESS MIDDLEWARES STACK --------------------------//
//Export app object as it runs through the middlewares
module.exports = //SESSIONS, COOKIES, DB CONNECTS
require('app/db/session')(app$640).use('/scripts', express$639.static(__dirname + '/components/clientscripts')).engine('dust', dust$642.engine({ useHelpers: true })).set('views', path$644.join(__dirname, 'components')).set('view engine', 'dust').use(require('app/components/login/router')).use(require('app/components/middlewares/checkSession')).use(require('app/components/index/router')).use(require('app/components/dashboard/router'));