(function () {
  'use strict';

  describe('Requirements Route Tests', function () {
    // Initialize global variables
    var $scope,
      RequirementsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RequirementsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RequirementsService = _RequirementsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('requirements');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/requirements');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          RequirementsController,
          mockRequirement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('requirements.view');
          $templateCache.put('modules/requirements/client/views/view-requirement.client.view.html', '');

          // create mock Requirement
          mockRequirement = new RequirementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Requirement Name'
          });

          // Initialize Controller
          RequirementsController = $controller('RequirementsController as vm', {
            $scope: $scope,
            requirementResolve: mockRequirement
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:requirementId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.requirementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            requirementId: 1
          })).toEqual('/requirements/1');
        }));

        it('should attach an Requirement to the controller scope', function () {
          expect($scope.vm.requirement._id).toBe(mockRequirement._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/requirements/client/views/view-requirement.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RequirementsController,
          mockRequirement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('requirements.create');
          $templateCache.put('modules/requirements/client/views/form-requirement.client.view.html', '');

          // create mock Requirement
          mockRequirement = new RequirementsService();

          // Initialize Controller
          RequirementsController = $controller('RequirementsController as vm', {
            $scope: $scope,
            requirementResolve: mockRequirement
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.requirementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/requirements/create');
        }));

        it('should attach an Requirement to the controller scope', function () {
          expect($scope.vm.requirement._id).toBe(mockRequirement._id);
          expect($scope.vm.requirement._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/requirements/client/views/form-requirement.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RequirementsController,
          mockRequirement;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('requirements.edit');
          $templateCache.put('modules/requirements/client/views/form-requirement.client.view.html', '');

          // create mock Requirement
          mockRequirement = new RequirementsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Requirement Name'
          });

          // Initialize Controller
          RequirementsController = $controller('RequirementsController as vm', {
            $scope: $scope,
            requirementResolve: mockRequirement
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:requirementId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.requirementResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            requirementId: 1
          })).toEqual('/requirements/1/edit');
        }));

        it('should attach an Requirement to the controller scope', function () {
          expect($scope.vm.requirement._id).toBe(mockRequirement._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/requirements/client/views/form-requirement.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
