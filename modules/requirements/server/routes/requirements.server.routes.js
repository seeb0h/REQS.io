'use strict';

/**
 * Module dependencies
 */
var requirementsPolicy = require('../policies/requirements.server.policy'),
  requirements = require('../controllers/requirements.server.controller');

module.exports = function(app) {
  // Requirements Routes
  app.route('/api/requirements').all(requirementsPolicy.isAllowed)
    .get(requirements.list)
    .post(requirements.create);

  app.route('/api/requirements/:requirementId').all(requirementsPolicy.isAllowed)
    .get(requirements.read)
    .put(requirements.update)
    .delete(requirements.delete);

  // Finish by binding the Requirement middleware
  app.param('requirementId', requirements.requirementByID);
};
