define(['loglevel'], function (log$7273) {
    log$7273.setLevel(levelOfLog);
    log$7273.info('in main.js!');
    return {
        helloMainJS: function helloMainJS$7274() {
            alert('Hello main.js!');
        }
    };
});