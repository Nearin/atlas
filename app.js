var express = require('express')
var app = require('express')();
var server = require('http').Server(app);

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var rootPath = path.dirname(require.main.filename);


//var sass = require('./server/middleware/sass');


  var cssPath = path.join(rootPath, 'server/public/css');

  console.log("Running SASS Middleware on " + cssPath);
  console.log("Src: " + path.join(__dirname, "/server/public/css"));

  app.use(sassMiddleware({
    src: path.join(__dirname, "server/public/css"),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/static/css/',
    force: true
  }));

var exphbs = require('express-handlebars');

app.set('views', __dirname + '/server/views');
app.set('layouts', __dirname + '/server/views/layouts');
app.set('partials', __dirname + '/server/views/partials');

app.engine('handlebars', exphbs({
    defaultLayout: 'default',
    extname: 'handlebars',
    layoutsDir: app.settings.layouts,
    partialsDir: app.settings.partials,
    }
));

app.get('/', function (req, res) {
    res.render('index');
  //res.json({json: 'Hello World!!!'});
});

app.set('view engine', 'handlebars');

app.use('/static', express.static('server/public'));

initSocketIo(server);

server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Atlas listening at http://%s:%s', host, port);
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
  nodes.push(createNodeJson('places-api', '1.0.0', 'OK', []));

  return {
    nodes:nodes
  }

}

function createFakeNodes2() {

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

