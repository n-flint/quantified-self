var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('api', () => {
  beforeAll(async () => {
    await shell.exec('npx sequelize db:create')
  });
  beforeEach(async () => {
      await shell.exec('npx sequelize db:migrate')
      await shell.exec('npx sequelize db:seed:all')
    });
  afterEach(async () => {
    await shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test the root path', () => {
    test('should return a 200', async () => {
      return request(app).get("/").then(async (response) => {
        expect(response.statusCode).toBe(200)
      })
    });
  });
});
