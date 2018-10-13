var assert = require('assert');
var app = require('../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

/**
 * Testing get all user endpoint
 */
describe('GET /api/users', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving an existing user
 */
describe('GET /api/user/:id', function () {
    it('respond with json containing a single user', function (done) {
        request(app)
            .get('/api/users/U001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving a non-existing user
 */
describe('GET /api/user/:id', function () {
    it('respond with json user not found', function (done) {
        request(app)
            .get('/api/users/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"user not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /api/users', function () {
    let data = {
        "id": "1",
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /api/users', function () {
    let data = {
        //no id
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/api/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"user not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});