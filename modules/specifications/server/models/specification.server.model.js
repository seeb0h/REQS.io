'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Specification Schema
 */
var SpecificationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Specification name',
    trim: true
  },
  docName: {
    type: String,
    default: '',
    required: 'Please fill Specification docName',
    trim: true
  },
  type: {
    type: String,
    default: '',
    required: 'Please fill Specification type',
    trim: true
  },
  version: {
    type: String,
    default: '',
    required: 'Please fill Specification version',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Specification', SpecificationSchema);
