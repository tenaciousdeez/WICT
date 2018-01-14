(function () {
  angular
    .module('wictApp')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'wictData', 'geolocation'];
    function homeCtrl ($scope, wictData, geolocation) {
      var vm = this;
      vm.pageHeader = {
        title: 'Dishes Near You',
        strapline: 'See what home cooks around you are making!'
      };
      vm.sidebar = {
        content: "WICT lets you share images of what you cooked with those around you, as well as see what others are cooking."
      };
      vm.message = "Checking your location";
      vm.getData = function (position) {
        var lat = position.coords.latitude,
        lng = position.coords.longitude;
        vm.message = "The buns are still in the oven!";
        wictData.dishByCoords(lat, lng)
          .then(
            function successCallback(data) {
            vm.message = data.length > 0 ? "" : "No dishes found near you. Be the first to add dishes in your area!";
            vm.data = { dishes: data };
          },
            function errorCallback(e) {
            console.log(e);
            vm.message = "Our stove is hooked up wrong, we're on it";
          });
      };
      vm.showError = function (error) {
        $scope.$apply(function () {
          vm.message = error.message;
        });
      };
      vm.noGeo = function () {
        $scope.$apply(function () {
          vm.message = "Geolocation not supported by your browser.";
        });
      };
      geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
    }
})();
