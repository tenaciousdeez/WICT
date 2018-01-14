angular.module('wictApp', []);

//Helper Functions
var _isNumeric = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};
var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};
var likesCount = function () {
  return {
    scope: {
      thisLikes : '=likes'
    },
    templateUrl : '/angular/likes-count.html'
  };
};
var wictData = function ($http) {
  var dishByCoords = function (lat, lng) {
    return $http.get('/api/dishes?lat=' + lat + '&lng=' + lng + '&maxDistance=20');
  };
  return {
    dishByCoords : dishByCoords
  };
};
var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};

var dishListCtrl = function ($scope, wictData, geolocation) {
  $scope.message = "Checking your location";
  $scope.getData = function (position) {
    var lat = position.coords.latitude,
    lng = position.coords.longitude;
    $scope.message = "The buns are still in the oven!";
    wictData.dishByCoords(lat, lng)
      .success(function (data) {
        $scope.message = data.length > 0 ? "" : "No dishes found near you. Be the first to add dishes in your area!";
        $scope.data = { dishes: data };
      })
      .error(function (e) {
        console.log(e);
        $scope.message = "Our stove is hooked up wrong, we're on it";
      });
  };
  $scope.showError = function (error) {
    $scope.$apply(function () {
      $scope.message = error.message;
    });
  };
  $scope.noGeo = function () {
    $scope.$apply(function () {
      $scope.message = "Geolocation not supported by your browser.";
    });
  };
  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

angular
.module('wictApp')
.controller('dishListCtrl', dishListCtrl)
.filter('formatDistance', formatDistance)
.directive('likesCount', likesCount)
.service('wictData', wictData)
.service('geolocation', geolocation);
