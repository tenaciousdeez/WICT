(function () {

  angular
    .module('wictApp')
    .controller('commentModalCtrl'. commentModalCtrl);

  commentModalCtrl.$inject = ['$modalInstance', 'wictData', 'dishData'];
  function commentModalCtrl ($modalInstance, wictData, dishData) {
    var vm = this;
    vm.dishData = dishData;

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.name || !vm.formData.commentText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddComment(vm.dishData.dishid, vm.formData);
      }
    };

    vm.doAddComment = function (dishid, formData) {
      wictData.addCommentById(dishid, {
        author : formData.name,
        commentText : formData.commentText
      })
        .success(function (data) {
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Your comment has not been saved, try again";
        });
      return false;
    };

    vm.modal = {
      close : function (result) {
        $modalInstance.close(result);
      },
      cancel : function () {
        $modalInstance.dismiss('cancel');
      }
    };
  }
})();
