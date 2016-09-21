'use strict';

describe('Specifications E2E Tests:', function () {
  describe('Test Specifications page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/specifications');
      expect(element.all(by.repeater('specification in specifications')).count()).toEqual(0);
    });
  });
});
