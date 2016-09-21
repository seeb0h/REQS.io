(function () {
  'use strict';

  angular
    .module('requirements')
    .controller('RequirementsListController', RequirementsListController);

  RequirementsListController.$inject = ['RequirementsService'];

  function RequirementsListController(RequirementsService) {
    var vm = this;

    vm.requirements = RequirementsService.query();
  }
}());
