(function () {
  'use strict';

  describe('Specifications Route Tests', function () {
    // Initialize global variables
    var $scope,
      SpecificationsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SpecificationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SpecificationsService = _SpecificationsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('specifications');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/specifications');
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
          SpecificationsController,
          mockSpecification;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('specifications.view');
          $templateCache.put('modules/specifications/client/views/view-specification.client.view.html', '');

          // create mock Specification
          mockSpecification = new SpecificationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Specification Name'
          });

          // Initialize Controller
          SpecificationsController = $controller('SpecificationsController as vm', {
            $scope: $scope,
            specificationResolve: mockSpecification
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:specificationId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.specificationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            specificationId: 1
          })).toEqual('/specifications/1');
        }));

        it('should attach an Specification to the controller scope', function () {
          expect($scope.vm.specification._id).toBe(mockSpecification._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/specifications/client/views/view-specification.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SpecificationsController,
          mockSpecification;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('specifications.create');
          $templateCache.put('modules/specifications/client/views/form-specification.client.view.html', '');

          // create mock Specification
          mockSpecification = new SpecificationsService();

          // Initialize Controller
          SpecificationsController = $controller('SpecificationsController as vm', {
            $scope: $scope,
            specificationResolve: mockSpecification
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.specificationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/specifications/create');
        }));

        it('should attach an Specification to the controller scope', function () {
          expect($scope.vm.specification._id).toBe(mockSpecification._id);
          expect($scope.vm.specification._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/specifications/client/views/form-specification.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SpecificationsController,
          mockSpecification;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('specifications.edit');
          $templateCache.put('modules/specifications/client/views/form-specification.client.view.html', '');

          // create mock Specification
          mockSpecification = new SpecificationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Specification Name'
          });

          // Initialize Controller
          SpecificationsController = $controller('SpecificationsController as vm', {
            $scope: $scope,
            specificationResolve: mockSpecification
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:specificationId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.specificationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            specificationId: 1
          })).toEqual('/specifications/1/edit');
        }));

        it('should attach an Specification to the controller scope', function () {
          expect($scope.vm.specification._id).toBe(mockSpecification._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/specifications/client/views/form-specification.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
