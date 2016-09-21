(function () {
  'use strict';

  // Specifications controller
  angular
    .module('specifications')
    .controller('SpecificationsController', SpecificationsController);

  SpecificationsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'specificationResolve'];

  function SpecificationsController ($scope, $state, $window, Authentication, specification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.specification = specification;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Specification
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.specification.$remove($state.go('specifications.list'));
      }
    }

    // Save Specification
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.specificationForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.specification._id) {
        vm.specification.$update(successCallback, errorCallback);
      } else {
        vm.specification.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('specifications.view', {
          specificationId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
