// Requirements service used to communicate Requirements REST endpoints
(function () {
  'use strict';

  angular
    .module('requirements')
    .factory('RequirementsService', RequirementsService);

  RequirementsService.$inject = ['$resource'];

  function RequirementsService($resource) {
    return $resource('api/requirements/:requirementId', {
      requirementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
