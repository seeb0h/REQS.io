'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Specification = mongoose.model('Specification'),
  Project = mongoose.model('Project'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  project,
  specification;

/**
 * Specification routes tests
 */
describe('Specification CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Specification
    user.save(function () {
      project = new Project({
        name: 'Project name',
        user: user
      });

      project.save(function () {
        specification = {
          name: 'Specification name',
          docName: 'Doc name',
          type: 'type',
          version: 'version'
        };

        done();
      });
    });
  });

  it('should be able to save a Specification if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Specification
        agent.post('/api/specifications')
          .send(specification)
          .expect(200)
          .end(function (specificationSaveErr, specificationSaveRes) {
            // Handle Specification save error
            if (specificationSaveErr) {
              return done(specificationSaveErr);
            }

            // Get a list of Specifications
            agent.get('/api/specifications')
              .end(function (specificationsGetErr, specificationsGetRes) {
                // Handle Specifications save error
                if (specificationsGetErr) {
                  return done(specificationsGetErr);
                }

                // Get Specifications list
                var specifications = specificationsGetRes.body;

                // Set assertions
                (specifications[0].user._id).should.equal(userId);
                (specifications[0].name).should.match('Specification name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Specification if not logged in', function (done) {
    agent.post('/api/specifications')
      .send(specification)
      .expect(403)
      .end(function (specificationSaveErr, specificationSaveRes) {
        // Call the assertion callback
        done(specificationSaveErr);
      });
  });

  it('should not be able to save an Specification if no name is provided', function (done) {
    // Invalidate name field
    specification.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Specification
        agent.post('/api/specifications')
          .send(specification)
          .expect(400)
          .end(function (specificationSaveErr, specificationSaveRes) {
            // Set message assertion
            (specificationSaveRes.body.message).should.match('Please fill Specification name');

            // Handle Specification save error
            done(specificationSaveErr);
          });
      });
  });

  it('should be able to update an Specification if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Specification
        agent.post('/api/specifications')
          .send(specification)
          .expect(200)
          .end(function (specificationSaveErr, specificationSaveRes) {
            // Handle Specification save error
            if (specificationSaveErr) {
              return done(specificationSaveErr);
            }

            // Update Specification name
            specification.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Specification
            agent.put('/api/specifications/' + specificationSaveRes.body._id)
              .send(specification)
              .expect(200)
              .end(function (specificationUpdateErr, specificationUpdateRes) {
                // Handle Specification update error
                if (specificationUpdateErr) {
                  return done(specificationUpdateErr);
                }

                // Set assertions
                (specificationUpdateRes.body._id).should.equal(specificationSaveRes.body._id);
                (specificationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Specifications if not signed in', function (done) {
    // Create new Specification model instance
    var specificationObj = new Specification(specification);

    // Save the specification
    specificationObj.save(function () {
      // Request Specifications
      request(app).get('/api/specifications')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Specification if not signed in', function (done) {
    // Create new Specification model instance
    var specificationObj = new Specification(specification);

    // Save the Specification
    specificationObj.save(function () {
      request(app).get('/api/specifications/' + specificationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', specification.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Specification with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/specifications/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Specification is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Specification which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Specification
    request(app).get('/api/specifications/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Specification with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Specification if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Specification
        agent.post('/api/specifications')
          .send(specification)
          .expect(200)
          .end(function (specificationSaveErr, specificationSaveRes) {
            // Handle Specification save error
            if (specificationSaveErr) {
              return done(specificationSaveErr);
            }

            // Delete an existing Specification
            agent.delete('/api/specifications/' + specificationSaveRes.body._id)
              .send(specification)
              .expect(200)
              .end(function (specificationDeleteErr, specificationDeleteRes) {
                // Handle specification error error
                if (specificationDeleteErr) {
                  return done(specificationDeleteErr);
                }

                // Set assertions
                (specificationDeleteRes.body._id).should.equal(specificationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Specification if not signed in', function (done) {
    // Set Specification user
    specification.user = user;

    // Create new Specification model instance
    var specificationObj = new Specification(specification);

    // Save the Specification
    specificationObj.save(function () {
      // Try deleting Specification
      request(app).delete('/api/specifications/' + specificationObj._id)
        .expect(403)
        .end(function (specificationDeleteErr, specificationDeleteRes) {
          // Set message assertion
          (specificationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Specification error error
          done(specificationDeleteErr);
        });

    });
  });

  it('should be able to get a single Specification that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Specification
          agent.post('/api/specifications')
            .send(specification)
            .expect(200)
            .end(function (specificationSaveErr, specificationSaveRes) {
              // Handle Specification save error
              if (specificationSaveErr) {
                return done(specificationSaveErr);
              }

              // Set assertions on new Specification
              (specificationSaveRes.body.name).should.equal(specification.name);
              should.exist(specificationSaveRes.body.user);
              should.equal(specificationSaveRes.body.user._id, orphanId);

              // force the Specification to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Specification
                    agent.get('/api/specifications/' + specificationSaveRes.body._id)
                      .expect(200)
                      .end(function (specificationInfoErr, specificationInfoRes) {
                        // Handle Specification error
                        if (specificationInfoErr) {
                          return done(specificationInfoErr);
                        }

                        // Set assertions
                        (specificationInfoRes.body._id).should.equal(specificationSaveRes.body._id);
                        (specificationInfoRes.body.name).should.equal(specification.name);
                        should.equal(specificationInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Project.remove().exec(function () {
        Specification.remove().exec(done);
      });
    });
  });
});
