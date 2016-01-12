define(['knockout', 'justGauge'], function(ko, justGage) {

  function NodeModel(params) {
    this.model = params.value;
    console.log('Node model: ' + JSON.stringify(this.model ));
  }

  NodeModel.prototype.nrOfDepedencies = function() {
    return this.model.dependencies.length;
  };

  NodeModel.prototype.getId = function() {
    var id = 'gauge_' + this.model.name;

    console.log(id);

    var g;

    setTimeout(function() {
      console.log('Creating gauge for: ' + id);
      g = new JustGage({
        id: id,
        value: getRandomInt(0, 100),
        min: 0,
        max: 100,
        hideMinMax: true,
        hideValue: true
      });
    },1000)

    setInterval(function() {
      g.refresh(getRandomInt(0, 100));
    }, 4000);

    return id;
  };

  //
  //LikeWidgetViewModel.prototype.dislike = function() {
  //  this.chosenValue('dislike');
  //};

  return NodeModel;

});