define(['loglevel'], function(log){
    log.info("in obj-lit-and-setup-fn.js closure!");
    return {
        key1: "obj-lit-and-setup-fn.js--val1",
        key2: "obj-lit-and-setup-fn.js--val2",
        key3: "obj-lit-and-setup-fn.js--val3"
    };
});