var app = require('express')();
var server = require('http').Server(app);

module.exports = server;
module.exports.expressApp = app;
