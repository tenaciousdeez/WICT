(function () {
  angular
    .module('wictApp')
    .controller('dishDetailCtrl', dishDetailCtrl);

  dishDetailCtrl.$inject = ['$routeParams', '$modal', 'wictData'];
  function dishDetailCtrl ($routeParams, $modal, wictData) {
    var vm = this;
    vm.dishid = $routeParams.dishid;

    wictData.dishById(vm.dishid)
      .success(function(data) {
        vm.data = { dish: data };
        vm.pageHeader = {
          title: vm.data.dish.name
        };
      })
      .error(function (e) {
        console.log(e);
      });

    vm.popupCommentForm = function () {
      var modalInstance = $modal.open({
        templateUrl: '/commentModal/commentModal.view.html',
        contorller: 'commentModalCtrl',
        controllerAs: 'vm',
        resolve : {
          dishData : function () {
            return {
              dishid : vm.dishid,
              dishName : vm.dish.name
            };
          }
        }
      });
      modalInstance.result.then(function (data) {
        vm.data.dish.comments.push(data);
      });
    };
  }
})();
