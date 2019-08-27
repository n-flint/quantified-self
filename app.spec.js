var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');
var cleanup = require('./spec/helper/testCleanup');

describe('api', () => {
  beforeEach(async () => {
      cleanup()
  });

  describe('Test the root path', () => {
    test('should return a 200', async () => {
      return request(app).get("/").then(async (response) => {
        expect(response.statusCode).toBe(200)
      })
    });
  });
});
