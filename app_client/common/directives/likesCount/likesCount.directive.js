(function () {
  angular
    .module('wictApp')
    .directive('likesCount', likesCount);

  function likesCount () {
    return {
      restrict: 'EA',
      scope: {
        thisLikes : '=likes'
      },
      templateUrl : '/common/directives/likesCount/likesCount.template.html'
    };
  }
})();
