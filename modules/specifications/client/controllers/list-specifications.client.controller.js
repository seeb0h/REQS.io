(function () {
  'use strict';

  angular
    .module('specifications')
    .controller('SpecificationsListController', SpecificationsListController);

  SpecificationsListController.$inject = ['SpecificationsService'];

  function SpecificationsListController(SpecificationsService) {
    var vm = this;

    vm.specifications = SpecificationsService.query();
  }
}());
