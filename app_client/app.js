(function () {
  angular.module('wictApp', ['ngRoute', 'ngSanitize', 'ngResource', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/about.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/dishes/:dishid', {
        templateUrl: '/dishDetail/dishDetail.view.html',
        controller: 'dishDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }

  angular
    .module('wictApp')
    .config(['$routeProvider', '$locationProvider', config]);
})();
