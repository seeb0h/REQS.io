// Specifications service used to communicate Specifications REST endpoints
(function () {
  'use strict';

  angular
    .module('specifications')
    .factory('SpecificationsService', SpecificationsService);

  SpecificationsService.$inject = ['$resource'];

  function SpecificationsService($resource) {
    return $resource('api/specifications/:specificationId', {
      specificationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
