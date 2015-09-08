module.exports = function(){ };

(function clientDashboard(){
    log.info('in dashboard-client.js!');

    return {
        helloMainJS: function helloMainJS(){
            alert('Hello main.js!');
        }
    };
}());
