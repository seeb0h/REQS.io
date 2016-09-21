(function () {
  'use strict';

  // Requirements controller
  angular
    .module('requirements')
    .controller('RequirementsController', RequirementsController);

  RequirementsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'requirementResolve'];

  function RequirementsController ($scope, $state, $window, Authentication, requirement) {
    var vm = this;

    vm.authentication = Authentication;
    vm.requirement = requirement;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Requirement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.requirement.$remove($state.go('requirements.list'));
      }
    }

    // Save Requirement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.requirementForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.requirement._id) {
        vm.requirement.$update(successCallback, errorCallback);
      } else {
        vm.requirement.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('requirements.view', {
          requirementId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
