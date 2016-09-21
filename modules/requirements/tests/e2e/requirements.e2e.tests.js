'use strict';

describe('Requirements E2E Tests:', function () {
  describe('Test Requirements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/requirements');
      expect(element.all(by.repeater('requirement in requirements')).count()).toEqual(0);
    });
  });
});
