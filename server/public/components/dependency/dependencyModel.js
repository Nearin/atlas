define(['knockout'], function(ko) {

  function DependencyModel(params) {
    this.model = params.value;
  }

  //LikeWidgetViewModel.prototype.like = function() {
  //  this.chosenValue('like');
  //};
  //
  //LikeWidgetViewModel.prototype.dislike = function() {
  //  this.chosenValue('dislike');
  //};

  return DependencyModel;

});