var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = require('server/server').expressApp;
var rootPath = path.dirname(require.main.filename);

module.exports = (function() {

  var cssPath = path.join(rootPath, 'public/css');

  console.log(__filename, "Running SASS Middleware on " + cssPath);

  app.use(sassMiddleware({
    src: "server/public/css",
    dest: 'server/public/css',
    debug: true,
    force: true,
    outputStyle: 'compressed',
    prefix:  '/static/css/'
  }));

  app.use('/static',express.static(path.join('server/public')));

})();