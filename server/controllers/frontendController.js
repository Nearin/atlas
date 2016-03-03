var server = require('server/server');

module.exports = (function() {

  server.expressApp.get('/', function (req, res) {
    res.render('index');
  });

})();