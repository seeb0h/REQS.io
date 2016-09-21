'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Requirement Schema
 */
var RequirementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Requirement name',
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: 'Please fill Requirement content',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Requirement', RequirementSchema);
