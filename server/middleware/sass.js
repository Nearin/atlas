var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = require('server/server').expressApp;
var rootPath = path.dirname(require.main.filename);

module.exports = (function() {

  var cssPath = path.join(rootPath, 'public/css');

  console.log(__filename, "Running SASS Middleware on " + cssPath);

  app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, "public/css"),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/static/css/'
  }));

  app.use(express.static(path.join(__dirname, 'public')));

})();