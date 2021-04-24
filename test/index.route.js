const assert = require('assert');
const request = require('supertest');
const cheerio = require('cheerio');
const app = require('../app');
const {fetchVaxRecords} = require('../lib/chicago-vax')
const {seedDatabase} = require('../db/seed');

describe('HTML requests', function() {

  before(async function() {
    await seedDatabase();
  });

  it('GET / should return the expected response', function() {
    return request(app)
      .get('/')
      .expect(200)
      .then(function(response) {
        const $ = cheerio.load(response.text);
        assert.equal(60, $('tbody tr').length, 'expected 60 rows');
      });
  });

  it('GET /60641 should return the expected response', function() {
    return request(app)
      .get('/60641')
      .expect(200)
      .then(function(response) {
        // console.log('Response body is', response);
        const $ = cheerio.load(response.text);
        assert.equal(10, $('tbody tr').length, 'expected 10 rows');
        assert.equal('Population: 69880', $('h2 + p').text());
      });
  });

});
