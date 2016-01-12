require(['static/require-config.js'], function() {
  require(['knockout', 'socket.io'],
      function (ko, io, justGage) {

        ko.components.register('node', {
          viewModel: { require: 'components/node/nodeModel' },
          template: { require: 'text!components/node/nodeTemplate.html' }
        });
        ko.components.register('dependency', {
          viewModel: { require: 'components/dependency/dependencyModel' },
          template: { require: 'text!components/dependency/dependencyTemplate.html' }
        });

        var model = {};

        model.nodes = ko.observableArray();

        model.nodes.subscribe(function(newValue) {
          console.log("Model is:  " + model.nodes()[0].name);
        });

        model.name = 'Atlas';

        var socket = io();
        socket.emit('message', { user: 'me', msg: 'whazzzup from CLIENT?' });

        socket.on('nodes', function(nodes){
          console.log(nodes);
          nodes.nodes.forEach((node) => model.nodes.push(node));
          //model.nodes.push(nodes.nodes[0]);
        });

        ko.applyBindings(model);



      return function () {};
  });
});
