(function () {
  angular
    .module('wictApp')
    .directive('wictFooter', wictFooter);

  function wictFooter () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/wictFooter/wictFooter.template.html'
    };
  }
})();
