var log = require('app/helpers/winston-logger'); //Logging

//Build a new router object
var loginRouter = require('express').Router();

//Modules
var async = require('async');
var uuid = require('node-uuid');

//Functions
var loginSuccessRedirect, loginFailRedirect;


//********************* EVENT-TRIGGERED FUNCTIONS *********************//

var eventActions = (function eventActions(){

    var loginDataBuffer = ''; //closure-persisted temp storage for in-streaming login data

    return {

        /**
         * storeDataOnReceipt
         * @param  {Buffer} chunk  data just received by the server
         */
        storeDataOnReceipt: function storeDataOnReceipt(chunk) {
            loginDataBuffer += chunk;
        },

        /**
         * getLoginDataFromPOST
         * @param  {Object} req
         * @param  {Object} res
         */
        getLoginDataFromPOST: function getLoginDataFromPOST(req, res) {

            async.waterfall([

                function wf1_extractUsrPassFromPOST(wf_next){
                    var usrPwdObj = {};

                    async.each(loginDataBuffer.split('&'), function(item, each_next){
                        var keyValArr = item.split('=');
                        usrPwdObj[keyValArr[0]] = keyValArr[1];
                        return each_next();

                    }, function(err){
                        loginDataBuffer = '';  //flush loginDataBuffer for next stream
                        return wf_next((err ? err : null), usrPwdObj);

                    });
                },

                function wf2_checkDbForUsrPass(usrPwdObj, wf_next){
                    var usr = usrPwdObj.username,
                        passwd = usrPwdObj.password;

                    if (typeof usr === 'undefined' || typeof passwd === 'undefined'){
                        return wf_next(new Error('usrOrPwNotFound').stack, false);
                    }
                    req.redisDb.hget('users', 'username:'+usr, function(err, dbPw) {
                        if ('password:'+passwd !== dbPw) {
                            return wf_next(new Error('incorrectPw'), true);
                        }
                        return wf_next(null, usr, dbPw);
                    });
                },


                /**
                 * Create a session key (UUID), store it in redis under key session:[newUUID]
                 * Set session to expire in a certain amount of time (300s for example)
                 */
                function wf3_createSession(username, password, wf_next){
                    var sessionId, uuidBuff;

                    //Generate UUID for session
                    uuidBuff = new Buffer(32);
                    uuid.v4(null, uuidBuff, 0);
                    uuid.v4(null, uuidBuff, 16);
                    sessionId = uuid.unparse(uuidBuff);
                    log.log('verbose', sessionId);
                    //_________________________

                    req.session.return_to = '/login';

                    //Store session in redis
                    req.redisDb.setex('session:username:' + username, 300, username, function(err, res){
                        if (err) return wf_next(err, false);
                        log.log('silly', res);
                        req.session.username = username;
                        req.session.isLoggedIn = true;
                        log.log('silly', req.session);
                        return wf_next(null, true);
                    });
                    // req.redisDb.set('session:' + sessionId, username, function(err, res){
                        // if (err) return wf_next(err, false);
                        // log.info(res);
                        // req.redisDb.expire('session:' + sessionId, 300, function(err, res){
                            // if (err) return wf_next(err, false);
                            // log.info(res);
                            // req.session.id = sessionId;
                            // req.isLoggedIn = true;
                            // log.info(req.session);
                            // return wf_next(null, true);
                        // });
                    // });
                }


            ], function wf_final_pickRedirectRoute(err, loginSuccess){
                if (err) {
                    if (err.message !== 'incorrectPw'){
                        log.error(err);
                    } else {
                        log.log('silly', 'failed password attempt');
                    }
                    // console.log(typeof err);
                    // console.log(err.message);
                    // console.dir(err, {showHidden: true, depth: 20, colors: true });
                    // console.log(err);
                    return loginFailRedirect(req, res);
                }
                //TODO maybe emit login attempt event? login success or fail event?
                return loginSuccessRedirect(req, res);
            });
        }

    };
}());

//********************************************************************//


//------------------ REDIRECT AFTER LOGIN ATTEMPT -------------------//
/** redirect back to login if login fails */
loginFailRedirect = function loginFailRedirect(req, res) {
    res.writeHead(302, { 'Location': '/login' }); //redirect
    res.end();
};

/** redirect to dashboard if login succeeds */
loginSuccessRedirect = function loginSuccessRedirect(req, res) {
    res.writeHead(302, { 'Location': '/dashboard' }); //redirect
    res.end();
};
//-------------------------------------------------------------------//


/****************************-- ACTUAL ROUTES --******************************/
loginRouter.route('/login')
    .get(function loadLoginPage(req, res) {
        res.render('login/tpl-login.dust');
    })
    .post(function registerRequestEvents(req, res) {
        req.on('data', eventActions.storeDataOnReceipt);
        req.on('end', eventActions.getLoginDataFromPOST.bind( this, req, res ));
    });
/*****************************************************************************/

module.exports = loginRouter;