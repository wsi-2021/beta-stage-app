const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const {fetchVaxRecords} = require('../lib/chicago-vax');
const {seedDatabase} = require('../db/seed');

describe('API requests', function() {

  before(async function() {
    await seedDatabase();
  });

  it('GET /api/ should return the expected response', function() {
    return request(app)
      .get('/api/')
      .expect(200)
      .then(function(response) {
        assert.equal(response.body.length, 60, 'expected 60 records');
      });
  });

  it('GET /api/60641 should return the expected response', function() {
    return request(app)
      .get('/api/60641')
      .expect(200)
      .then(function(response) {
        assert.equal(response.body.length, 10, 'expected 10 records');
        assert.equal('60641', response.body[0].zip_code, 'expected 60641');
      });
  });

});
