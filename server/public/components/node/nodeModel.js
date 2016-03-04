define(['knockout', 'justGauge'], function(ko, justGage) {

  function NodeModel(params) {
    this.model = {
      "name": params.value.name,
      "version": params.value.version,
      "status": ko.observable(params.value.status),
      dependencies: params.value.dependencies
    };
  }

  NodeModel.prototype.nrOfDepedencies = function() {
    return this.model.dependencies.length;
  };

  NodeModel.prototype.getId = function() {
    var self =  this;
    var id = 'gauge_' + this.model.name;

    document.body.addEventListener(this.model.name + '-' + this.model.version, function(event) {
      handleMessage(event.detail)
    }, false);

    function handleMessage(msg) {
      if(msg) {
        if(msg.status) {
          self.model.status(msg.status);
        }
      }
    }

    var g;
    var thiz = this;

    setTimeout(function() {
      g = new JustGage({
        id: id,
        value: getRandomInt(0, 100),
        min: 0,
        max: 100,
        hideMinMax: true,
        hideValue: true,
        relativeGaugeSize: true
      });
    },1000)

    setInterval(function() {
      g.refresh(getRandomInt(0, 100));
    }, 4000);

    return id;
  };

  return NodeModel;

});