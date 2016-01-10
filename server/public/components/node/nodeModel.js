define(['knockout'], function(ko) {

  function NodeModel(params) {
    this.model = params.value;
  }

  //LikeWidgetViewModel.prototype.like = function() {
  //  this.chosenValue('like');
  //};
  //
  //LikeWidgetViewModel.prototype.dislike = function() {
  //  this.chosenValue('dislike');
  //};

  return NodeModel;

});