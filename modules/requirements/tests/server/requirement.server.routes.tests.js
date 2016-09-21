'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Requirement = mongoose.model('Requirement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  requirement;

/**
 * Requirement routes tests
 */
describe('Requirement CRUD tests', function () {

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

    // Save a user to the test db and create new Requirement
    user.save(function () {
      requirement = {
        name: 'Requirement name'
      };

      done();
    });
  });

  it('should be able to save a Requirement if logged in', function (done) {
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

        // Save a new Requirement
        agent.post('/api/requirements')
          .send(requirement)
          .expect(200)
          .end(function (requirementSaveErr, requirementSaveRes) {
            // Handle Requirement save error
            if (requirementSaveErr) {
              return done(requirementSaveErr);
            }

            // Get a list of Requirements
            agent.get('/api/requirements')
              .end(function (requirementsGetErr, requirementsGetRes) {
                // Handle Requirements save error
                if (requirementsGetErr) {
                  return done(requirementsGetErr);
                }

                // Get Requirements list
                var requirements = requirementsGetRes.body;

                // Set assertions
                (requirements[0].user._id).should.equal(userId);
                (requirements[0].name).should.match('Requirement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Requirement if not logged in', function (done) {
    agent.post('/api/requirements')
      .send(requirement)
      .expect(403)
      .end(function (requirementSaveErr, requirementSaveRes) {
        // Call the assertion callback
        done(requirementSaveErr);
      });
  });

  it('should not be able to save an Requirement if no name is provided', function (done) {
    // Invalidate name field
    requirement.name = '';

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

        // Save a new Requirement
        agent.post('/api/requirements')
          .send(requirement)
          .expect(400)
          .end(function (requirementSaveErr, requirementSaveRes) {
            // Set message assertion
            (requirementSaveRes.body.message).should.match('Please fill Requirement name');

            // Handle Requirement save error
            done(requirementSaveErr);
          });
      });
  });

  it('should be able to update an Requirement if signed in', function (done) {
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

        // Save a new Requirement
        agent.post('/api/requirements')
          .send(requirement)
          .expect(200)
          .end(function (requirementSaveErr, requirementSaveRes) {
            // Handle Requirement save error
            if (requirementSaveErr) {
              return done(requirementSaveErr);
            }

            // Update Requirement name
            requirement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Requirement
            agent.put('/api/requirements/' + requirementSaveRes.body._id)
              .send(requirement)
              .expect(200)
              .end(function (requirementUpdateErr, requirementUpdateRes) {
                // Handle Requirement update error
                if (requirementUpdateErr) {
                  return done(requirementUpdateErr);
                }

                // Set assertions
                (requirementUpdateRes.body._id).should.equal(requirementSaveRes.body._id);
                (requirementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Requirements if not signed in', function (done) {
    // Create new Requirement model instance
    var requirementObj = new Requirement(requirement);

    // Save the requirement
    requirementObj.save(function () {
      // Request Requirements
      request(app).get('/api/requirements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Requirement if not signed in', function (done) {
    // Create new Requirement model instance
    var requirementObj = new Requirement(requirement);

    // Save the Requirement
    requirementObj.save(function () {
      request(app).get('/api/requirements/' + requirementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', requirement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Requirement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/requirements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Requirement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Requirement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Requirement
    request(app).get('/api/requirements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Requirement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Requirement if signed in', function (done) {
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

        // Save a new Requirement
        agent.post('/api/requirements')
          .send(requirement)
          .expect(200)
          .end(function (requirementSaveErr, requirementSaveRes) {
            // Handle Requirement save error
            if (requirementSaveErr) {
              return done(requirementSaveErr);
            }

            // Delete an existing Requirement
            agent.delete('/api/requirements/' + requirementSaveRes.body._id)
              .send(requirement)
              .expect(200)
              .end(function (requirementDeleteErr, requirementDeleteRes) {
                // Handle requirement error error
                if (requirementDeleteErr) {
                  return done(requirementDeleteErr);
                }

                // Set assertions
                (requirementDeleteRes.body._id).should.equal(requirementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Requirement if not signed in', function (done) {
    // Set Requirement user
    requirement.user = user;

    // Create new Requirement model instance
    var requirementObj = new Requirement(requirement);

    // Save the Requirement
    requirementObj.save(function () {
      // Try deleting Requirement
      request(app).delete('/api/requirements/' + requirementObj._id)
        .expect(403)
        .end(function (requirementDeleteErr, requirementDeleteRes) {
          // Set message assertion
          (requirementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Requirement error error
          done(requirementDeleteErr);
        });

    });
  });

  it('should be able to get a single Requirement that has an orphaned user reference', function (done) {
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

          // Save a new Requirement
          agent.post('/api/requirements')
            .send(requirement)
            .expect(200)
            .end(function (requirementSaveErr, requirementSaveRes) {
              // Handle Requirement save error
              if (requirementSaveErr) {
                return done(requirementSaveErr);
              }

              // Set assertions on new Requirement
              (requirementSaveRes.body.name).should.equal(requirement.name);
              should.exist(requirementSaveRes.body.user);
              should.equal(requirementSaveRes.body.user._id, orphanId);

              // force the Requirement to have an orphaned user reference
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

                    // Get the Requirement
                    agent.get('/api/requirements/' + requirementSaveRes.body._id)
                      .expect(200)
                      .end(function (requirementInfoErr, requirementInfoRes) {
                        // Handle Requirement error
                        if (requirementInfoErr) {
                          return done(requirementInfoErr);
                        }

                        // Set assertions
                        (requirementInfoRes.body._id).should.equal(requirementSaveRes.body._id);
                        (requirementInfoRes.body.name).should.equal(requirement.name);
                        should.equal(requirementInfoRes.body.user, undefined);

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
      Requirement.remove().exec(done);
    });
  });
});
