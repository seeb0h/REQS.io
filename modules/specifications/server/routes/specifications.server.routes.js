'use strict';

/**
 * Module dependencies
 */
var specificationsPolicy = require('../policies/specifications.server.policy'),
  specifications = require('../controllers/specifications.server.controller');

module.exports = function (app) {
  // Specifications Routes
  app.route('/api/specifications').all(specificationsPolicy.isAllowed)
    .get(specifications.list)
    .post(specifications.create);

  app.route('/api/specifications/:specificationId').all(specificationsPolicy.isAllowed)
    .get(specifications.read)
    .put(specifications.update)
    .delete(specifications.delete);

  app.route('/api/specifications/:specificationId/requirements').all(specificationsPolicy.isAllowed)
    .post(specifications.importRequirements);


  // Finish by binding the Specification middleware
  app.param('specificationId', specifications.specificationByID);
};
