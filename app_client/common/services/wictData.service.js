(function () {
  angular
    .module('wictApp')
    .service('wictData', wictData);

  wictData.$inject = ['$http'];
  function wictData ($http) {
    var dishByCoords = function (lat, lng) {
      return $http.get('/api/dishes?lat=' + lat + '&lng=' + lng + '&maxDistance=20');
    };

    var dishById = function (dishid) {
      return $http.get('/api/dishes/' + dishid);
    };

    var addCommentById = function (dishid, data) {
      return $hhtp.post('/api/dishes/' + dishid + '/comments', data);
    };

    return {
      dishByCoords : dishByCoords,
      dishById : dishById,
      addCommentById : addCommentById
    };
  }
})();
