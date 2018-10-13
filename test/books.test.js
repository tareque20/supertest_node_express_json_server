var assert = require('assert');
var app = require('../app'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

/**
 * Testing get all user endpoint
 */
describe('GET /api/books', function () {
    it('respond with json containing a list of all books', function (done) {
        request(app)
            .get('/api/books')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving an existing user
 */
describe('GET /api/books/:_id', function () {
    it('respond with json containing a single book', function (done) {
        request(app)
            .get('/api/books/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving a non-existing user
 */
describe('GET /api/books/:_id', function () {
    it('respond with json book not found', function (done) {
        request(app)
            .get('/api/books/1000')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"book not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /api/books', function () {
    let data = {
        "title": "Avengers",
        "genres": "Action",
        "description": "This is best book ever",
        "author": "MonsterLab"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/api/books')
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
describe('POST /api/books', function () {
    let data = {
        "title": "A",
        "genres": "Action",
        "description": "This is best book ever",
        "author": "M"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/api/books')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"book not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});