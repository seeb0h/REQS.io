(function () {
  'use strict';

  angular
    .module('specifications')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('specifications', {
        abstract: true,
        url: '/specifications',
        template: '<ui-view/>'
      })
      .state('specifications.list', {
        url: '',
        templateUrl: 'modules/specifications/client/views/list-specifications.client.view.html',
        controller: 'SpecificationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Specifications List'
        }
      })
      .state('specifications.create', {
        url: '/create',
        templateUrl: 'modules/specifications/client/views/form-specification.client.view.html',
        controller: 'SpecificationsController',
        controllerAs: 'vm',
        resolve: {
          specificationResolve: newSpecification
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Specifications Create'
        }
      })
      .state('specifications.edit', {
        url: '/:specificationId/edit',
        templateUrl: 'modules/specifications/client/views/form-specification.client.view.html',
        controller: 'SpecificationsController',
        controllerAs: 'vm',
        resolve: {
          specificationResolve: getSpecification
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Specification {{ specificationResolve.name }}'
        }
      })
      .state('specifications.view', {
        url: '/:specificationId',
        templateUrl: 'modules/specifications/client/views/view-specification.client.view.html',
        controller: 'SpecificationsController',
        controllerAs: 'vm',
        resolve: {
          specificationResolve: getSpecification
        },
        data: {
          pageTitle: 'Specification {{ specificationResolve.name }}'
        }
      });
  }

  getSpecification.$inject = ['$stateParams', 'SpecificationsService'];

  function getSpecification($stateParams, SpecificationsService) {
    return SpecificationsService.get({
      specificationId: $stateParams.specificationId
    }).$promise;
  }

  newSpecification.$inject = ['SpecificationsService'];

  function newSpecification(SpecificationsService) {
    return new SpecificationsService();
  }
}());
