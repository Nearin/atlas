var express = require('express')
var path = require('path');
var server = require('server/server');

var exphbs = require('express-handlebars');

server.expressApp.set('views', __dirname + '/server/views');
server.expressApp.set('layouts', __dirname + '/server/views/layouts');
server.expressApp.set('partials', __dirname + '/server/views/partials');

server.expressApp.engine('handlebars', exphbs({
    defaultLayout: 'default',
    extname: 'handlebars',
    layoutsDir: server.expressApp.settings.layouts,
    partialsDir: server.expressApp.settings.partials
    }
));

server.expressApp.set('view engine', 'handlebars');

require('server/controllers/frontendController');
require('server/middleware/sass');

initSocketIo(server);

server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Gossip listening at http://%s:%s', host, port);
});


function initSocketIo(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
      console.log('Something conneected to server');
      socket.on('message', function(msg) {
          console.log("Message was received");
          console.log(msg.user + ': ' + msg.msg);
          socket.emit('nodes', createFakeNodes());

        setTimeout(function(){
          socket.emit('nodes', createFakeNodes2());
        }, 2000);

        setTimeout(function(){
          socket.emit('message', {to: 'places-web-1.0.0', data: { status : 'WARNING'}});
        }, 5000);

      });
  });


  var socket = require('socket.io-client')('http://localhost:3000');
  //var socket = ioClient.connect('http://localhost', {
  //  port: 3000
  //});

  socket.on('connect', function () { console.log("socket connected"); });

  socket.emit('message', { user: 'me', msg: 'whazzzup?' });
}

function createNodeJson(name, version, status, dependencies) {
  return {
    "name": name,
    "version": version,
    "status": status,
    dependencies: dependencies
  }
}

function createFakeNodes() {

  var nodes = [];


  nodes.push(createNodeJson('places-web', '1.0.0', 'OK', [createNodeJson('places-api', '1.0.0', 'OK', []), createNodeJson('publications-api', '1.0.0', 'OK', [])]));
  nodes.push(createNodeJson('places-api', '1.0.0', 'WARNING', []));

  return {
    nodes:nodes
  }
}

function createFakeNodes2() {

  var nodes = [];


  nodes.push(createNodeJson('publications-web', '1.0.0', 'ERROR', [createNodeJson('publications-api', '1.0.0', 'OK', [])]));
  nodes.push(createNodeJson('publications-api', '1.0.0', 'OK', []));
  nodes.push(createNodeJson('a-api', '1.0.0', 'OK', []));
  nodes.push(createNodeJson('b-api', '1.0.0', 'OK', []));
  nodes.push(createNodeJson('c-api', '1.0.0', 'OK', []));

  return {
    nodes: nodes
  }
}

function createTrouble() {

  var nodes = [];

  nodes.push(createNodeJson('publications-web', '1.0.0', 'OK', [createNodeJson('publications-api', '1.0.0', 'OK', [])]));
  nodes.push(createNodeJson('publications-api', '1.0.0', 'OK', []));
  nodes.push(createNodeJson('a-api', '1.0.0', 'OK', []));
  nodes.push(createNodeJson('b-api', '1.0.0', 'OK', []));
  nodes.push(createNodeJson('c-api', '1.0.0', 'OK', []));

  return {
    nodes: nodes
  }
}

