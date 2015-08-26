define(['loglevel'], function(log){
    log.info("in testAddedJsFile!");
    return {
        alertHello: function(){
            log.info("Hello world! From testaddedjsfile.js.");
        }
    };
});