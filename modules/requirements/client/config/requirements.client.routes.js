(function () {
  'use strict';

  angular
    .module('requirements')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('requirements', {
        abstract: true,
        url: '/requirements',
        template: '<ui-view/>'
      })
      .state('requirements.list', {
        url: '',
        templateUrl: 'modules/requirements/client/views/list-requirements.client.view.html',
        controller: 'RequirementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Requirements List'
        }
      })
      .state('requirements.create', {
        url: '/create',
        templateUrl: 'modules/requirements/client/views/form-requirement.client.view.html',
        controller: 'RequirementsController',
        controllerAs: 'vm',
        resolve: {
          requirementResolve: newRequirement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Requirements Create'
        }
      })
      .state('requirements.edit', {
        url: '/:requirementId/edit',
        templateUrl: 'modules/requirements/client/views/form-requirement.client.view.html',
        controller: 'RequirementsController',
        controllerAs: 'vm',
        resolve: {
          requirementResolve: getRequirement
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Requirement {{ requirementResolve.name }}'
        }
      })
      .state('requirements.view', {
        url: '/:requirementId',
        templateUrl: 'modules/requirements/client/views/view-requirement.client.view.html',
        controller: 'RequirementsController',
        controllerAs: 'vm',
        resolve: {
          requirementResolve: getRequirement
        },
        data: {
          pageTitle: 'Requirement {{ requirementResolve.name }}'
        }
      });
  }

  getRequirement.$inject = ['$stateParams', 'RequirementsService'];

  function getRequirement($stateParams, RequirementsService) {
    return RequirementsService.get({
      requirementId: $stateParams.requirementId
    }).$promise;
  }

  newRequirement.$inject = ['RequirementsService'];

  function newRequirement(RequirementsService) {
    return new RequirementsService();
  }
}());
