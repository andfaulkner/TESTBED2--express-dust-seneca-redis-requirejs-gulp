var log$4673 = require('app/helpers/winston-logger');
var //Logging
//Build a new router object
loginRouter$4674 = require('express').Router();
var //Modules
async$4675 = require('async');
var uuid$4676 = require('node-uuid');
var
    //Functions
    loginSuccessRedirect$4677, loginFailRedirect$4678;
var //********************* EVENT-TRIGGERED FUNCTIONS *********************//
eventActions$4679 = function eventActions$4679() {
    var loginDataBuffer$4680 = '';
    return {
        //closure-persisted temp storage for in-streaming login data
        /**
         * storeDataOnReceipt
         * @param  {Buffer} chunk  data just received by the server
         */
        storeDataOnReceipt: function storeDataOnReceipt$4681(chunk$4683) {
            loginDataBuffer$4680 += chunk$4683;
        },
        /**
         * getLoginDataFromPOST
         * @param  {Object} req
         * @param  {Object} res
         */
        getLoginDataFromPOST: function getLoginDataFromPOST$4682(req$4684, res$4685) {
            async$4675.waterfall([
                function wf1_extractUsrPassFromPOST$4686(wf_next$4689) {
                    var usrPwdObj$4690 = {};
                    async$4675.each(loginDataBuffer$4680.split('&'), function (item$4691, each_next$4692) {
                        var keyValArr$4693 = item$4691.split('=');
                        usrPwdObj$4690[keyValArr$4693[0]] = keyValArr$4693[1];
                        return each_next$4692();
                    }, function (err$4694) {
                        loginDataBuffer$4680 = '';
                        return //flush loginDataBuffer for next stream
                        wf_next$4689(err$4694 ? err$4694 : null, usrPwdObj$4690);
                    });
                },
                function wf2_checkDbForUsrPass$4687(usrPwdObj$4695, wf_next$4696) {
                    var usr$4697 = usrPwdObj$4695.username, passwd$4698 = usrPwdObj$4695.password;
                    if (typeof usr$4697 === 'undefined' || typeof passwd$4698 === 'undefined') {
                        return wf_next$4696(new Error('usrOrPwNotFound').stack, false);
                    }
                    req$4684.redisDb.hget('users', 'username:' + usr$4697, function (err$4699, dbPw$4700) {
                        if ('password:' + passwd$4698 !== dbPw$4700) {
                            return wf_next$4696(new Error('incorrectPw'), true);
                        }
                        return wf_next$4696(null, usr$4697, dbPw$4700);
                    });
                },
                function wf3_createSession$4688(username$4701, password$4702, wf_next$4703) {
                    //Generate UUID for session
                    uuidBuff = new Buffer(32);
                    uuid$4676.v4(null, uuidBuff, 0);
                    uuid$4676.v4(null, uuidBuff, 16);
                    sessionId = uuid$4676.unparse(uuidBuff);
                    log$4673.log('verbose', sessionId);
                    //_________________________
                    req$4684.session.return_to = '/login';
                    //Store session in redis
                    req$4684.redisDb.setex('session:username:' + username$4701, 300, username$4701, function (err$4704, res$4705) {
                        if (err$4704)
                            return wf_next$4703(err$4704, false);
                        log$4673.log('silly', res$4705);
                        req$4684.session.username = username$4701;
                        req$4684.session.isLoggedIn = true;
                        log$4673.log('silly', req$4684.session);
                        return wf_next$4703(null, true);
                    });
                }
            ], function wf_final_pickRedirectRoute(err$4706, loginSuccess$4707) {
                if (err$4706) {
                    log$4673.error(err$4706);
                    return loginFailRedirect$4678(req$4684, res$4685);
                }
                //TODO maybe emit login attempt event? login success or fail event?
                return loginSuccessRedirect$4677(req$4684, res$4685);
            });
        }
    };
}();
//********************************************************************//
//------------------ REDIRECT AFTER LOGIN ATTEMPT -------------------//
/** redirect back to login if login fails */
loginFailRedirect$4678 = function loginFailRedirect$4678(req$4708, res$4709) {
    res$4709.writeHead(302, { 'Location': '/login' });
    //redirect
    res$4709.end();
};
/** redirect to dashboard if login succeeds */
loginSuccessRedirect$4677 = function loginSuccessRedirect$4677(req$4710, res$4711) {
    res$4711.writeHead(302, { 'Location': '/dashboard' });
    //redirect
    res$4711.end();
};
//-------------------------------------------------------------------//
/****************************-- ACTUAL ROUTES --******************************/
loginRouter$4674.route('/login').get(function loadLoginPage(req$4712, res$4713) {
    res$4713.render('login/index.dust');
}).post(function registerRequestEvents(req$4714, res$4715) {
    req$4714.on('data', eventActions$4679.storeDataOnReceipt);
    req$4714.on('end', eventActions$4679.getLoginDataFromPOST.bind(this, req$4714, res$4715));
});
/*****************************************************************************/
module.exports = loginRouter$4674;