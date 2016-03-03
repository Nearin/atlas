require(['static/require-config.js'], function() {
  require(['knockout', 'socket.io', 'jquery', 'knockout-projections'],
      function (ko, io, jquery) {

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

        //model.nodes.subscribe(function(newValue) {
        //  console.log("Model is:  " + model.nodes()[0].name);
        //});

        model.name = 'Atlas';

        var socket = io();

        socket.emit('message', { user: 'me', msg: 'whazzzup from CLIENT?' });

        socket.on('nodes', function(nodes) {
          console.log(nodes);
          nodes.nodes.forEach((node) => model.nodes.push(node));

          // Gör en metod som gör om fälten till observables.
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
