module.exports = function emitStrings( options ) {
    this.add( 'role:emitstr,cmd:hello', function( args, done ){
        done( null, { say:"hellooooooooooo!!" })
    });
};