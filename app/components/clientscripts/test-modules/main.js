define(['loglevel'], function(log){
    log.setLevel(levelOfLog);
    log.info('in main.js!');

    return {
        helloMainJS: function helloMainJS(){
            alert("Hello main.js!");
        }
    };

});