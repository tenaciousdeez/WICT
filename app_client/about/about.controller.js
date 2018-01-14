(function () {
  angular
    .module('wictApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl () {
    var vm = this;

    vm.pageHeader = {
      title: 'About WICT'
    };
    vm.main = {
      content: "WICT lets you share pictures and recipes of the things you cook at home with others around the world. It also lets you see what other people in other places (or around you) are cooking.\n\nTEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT"
    };
  }
})();
