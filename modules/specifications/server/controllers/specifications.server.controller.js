'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Specification = mongoose.model('Specification'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Specification
 */
exports.create = function(req, res) {
  var specification = new Specification(req.body);
  specification.user = req.user;

  specification.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specification);
    }
  });
};

/**
 * Show the current Specification
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var specification = req.specification ? req.specification.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  specification.isCurrentUserOwner = req.user && specification.user && specification.user._id.toString() === req.user._id.toString();

  res.jsonp(specification);
};

/**
 * Update a Specification
 */
exports.update = function(req, res) {
  var specification = req.specification;

  specification = _.extend(specification, req.body);

  specification.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specification);
    }
  });
};

/**
 * Delete an Specification
 */
exports.delete = function(req, res) {
  var specification = req.specification;

  specification.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specification);
    }
  });
};

/**
 * List of Specifications
 */
exports.list = function(req, res) {
  Specification.find().sort('-created').populate('user', 'displayName').exec(function(err, specifications) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specifications);
    }
  });
};

/**
 * Specification middleware
 */
exports.specificationByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Specification is invalid'
    });
  }

  Specification.findById(id).populate('user', 'displayName').exec(function (err, specification) {
    if (err) {
      return next(err);
    } else if (!specification) {
      return res.status(404).send({
        message: 'No Specification with that identifier has been found'
      });
    }
    req.specification = specification;
    next();
  });
};
