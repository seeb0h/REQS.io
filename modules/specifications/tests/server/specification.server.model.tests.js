'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Project = mongoose.model('Project'),
  Specification = mongoose.model('Specification');

/**
 * Globals
 */
var user,
  project,
  specification;

/**
 * Unit tests
 */
describe('Specification Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      project = new Project({
        name: 'Project test 1',
        user: user
      });
      project.save(function () {
        specification = new Specification({
          name: 'Specification Name',
          docName: 'Doc Name',
          type: 'type',
          version: '1.0',
          project: project,
          user: user
        });
        done();
      });
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return specification.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      specification.name = '';

      return specification.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Specification.remove().exec(function () {
      Project.remove().exec(function () {
        User.remove().exec(function () {
          done();
        });
      });
    });
  });
});
