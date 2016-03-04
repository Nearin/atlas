require(['static/require-config.js'], function() {
  require(['knockout', 'socket.io', 'jquery', 'underscore', 'knockout-projections'],
      function (ko, io, jquery, _) {

        ko.components.register('node', {
          viewModel: { require: 'components/node/nodeModel' },
          template: { require: 'text!components/node/nodeTemplate.html' }
        });
        ko.components.register('dependency', {
          viewModel: { require: 'components/dependency/dependencyModel' },
          template: { require: 'text!components/dependency/dependencyTemplate.html' }
        });

        /**
         *  TODO
         *
         */


        var model = {};

        model.nodes = ko.observableArray();

        //model.nodes.subscribe(function(newValue) {
        //  console.log("Model is:  " + model.nodes()[0].name);
        //});

        model.name = 'Atlas';

        var socket = io();

        socket.emit('message', { user: 'me', msg: 'whazzzup from CLIENT?' });

        var nodes = [];

        socket.on('nodes', function(nodes) {
          _.difference(nodes.nodes, model.nodes).forEach(node => model.nodes.push(node));
        });

        socket.on('message', function(msg) {
          var event = new CustomEvent(msg.to , { 'detail': msg.data});
          document.body.dispatchEvent(event);
        });

        model.animateAdd = function(element) {
          if (element.nodeType === 1) {
            jquery(element).hide().fadeIn();
          }
        };

        model.animateRemove = function(element) {
          if (element.nodeType === 1) {
            jquery(element).show().fadeOut();
          }
        };

        model.currentFilter = ko.observable();

        this.filteredNodes = ko.pureComputed(function() {
          if(!model.currentFilter() || model.currentFilter().length === 0) {
            return model.nodes();
          } else {

            var event = new CustomEvent(
                "status",
                {
                  detail: {
                    message: "Hello World!",
                    time: new Date(),
                  },
                  bubbles: true,
                  cancelable: true
                }
            );


            document.getElementById("body").dispatchEvent(event);


            return model.nodes().filter(function(x) { return x.name.indexOf(model.currentFilter()) >= 0 });
          }
        }, model);

        ko.applyBindings(model);


      return function () {};
  });
});
