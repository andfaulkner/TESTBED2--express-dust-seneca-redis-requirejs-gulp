//Logger
var log = require('app/helpers/winston-logger');

module.exports = function(seneca){

    var superlog = function superlog( err, result ){
        if (err) return log.error( err );
        log.info(result);
    };

    seneca
        .act(
            'role:math,cmd:sum,' + 'left:1, right:2',
            function( err, result ){
                if (err) return log.error( err );
                log.info(result);
            })

        .act(
              'role:math,cmd:multiply,' + 'left:5, right: 4',
              superlog
            )

        .act( 'role:math,cmd:subtract,' + 'left:20,right:5',
              superlog
            )

        .act( 'role:math,cmd:sum,' + 'left:4,right:211', superlog );

    return seneca;
};