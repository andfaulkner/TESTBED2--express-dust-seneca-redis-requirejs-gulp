var terminal = require('child_process').spawn('bash');

terminal.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

setTimeout(function() {
    console.log('Sending stdin to terminal');
    terminal.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
    terminal.stdin.write('uptime\n');
    console.log('Ending terminal session');
    terminal.stdin.end();
}, 1000);

console.log(process.title);
process.title = "processtesting";
console.log(process.title);
console.log(process.execPath);

process.on('exit', function(code) {
  console.log('About to exit with code:', code);
});

process.on('SIGINT', function() {
  console.log('Got SIGINT.  Press Control-D to exit.');
});



process.on('SIGTERM', function() {
  console.log('Got SIGTERM.');
});

process.chdir('..');
console.log(process.cwd());

process.chdir('..');
console.log(process.cwd());

console.log(process.argv);

//process.exitCode = 1;
//process.exit();
//console.log(process.exitCode);
//process.exitCode
//process.abort();
