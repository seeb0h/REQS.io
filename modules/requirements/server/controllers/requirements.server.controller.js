'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Requirement = mongoose.model('Requirement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Requirement
 */
exports.create = function(req, res) {
  var requirement = new Requirement(req.body);
  requirement.user = req.user;

  requirement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(requirement);
    }
  });
};

/**
 * Show the current Requirement
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var requirement = req.requirement ? req.requirement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  requirement.isCurrentUserOwner = req.user && requirement.user && requirement.user._id.toString() === req.user._id.toString();

  res.jsonp(requirement);
};

/**
 * Update a Requirement
 */
exports.update = function(req, res) {
  var requirement = req.requirement;

  requirement = _.extend(requirement, req.body);

  requirement.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(requirement);
    }
  });
};

/**
 * Delete an Requirement
 */
exports.delete = function(req, res) {
  var requirement = req.requirement;

  requirement.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(requirement);
    }
  });
};

/**
 * List of Requirements
 */
exports.list = function(req, res) {
  Requirement.find().sort('-created').populate('user', 'displayName').exec(function(err, requirements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(requirements);
    }
  });
};

/**
 * Requirement middleware
 */
exports.requirementByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Requirement is invalid'
    });
  }

  Requirement.findById(id).populate('user', 'displayName').exec(function (err, requirement) {
    if (err) {
      return next(err);
    } else if (!requirement) {
      return res.status(404).send({
        message: 'No Requirement with that identifier has been found'
      });
    }
    req.requirement = requirement;
    next();
  });
};
