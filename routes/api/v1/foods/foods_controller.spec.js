var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../../app.js');
let Food = require('../../../../models').Food
let {sequelize} = require('../../../../models');

describe('Test GET /api/v1/foods path', () => {
  beforeAll(async () => {
    await shell.exec('npx sequelize db:create')
  });
  beforeEach(async () => {
    await shell.exec('npx sequelize db:migrate')
    await shell.exec('npx sequelize db:seed:all')
  });
  afterAll(async () => {
    await shell.exec('npx sequelize db:migrate:undo:all')
  });
  test('should return a 200 status', async () => {
    return request(app).get("/api/v1/foods").then(response => {
      expect(response.status).toBe(200)
    });
  });
  test('should return an array of food objects', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let appleParams = { "name": "Apple", "calories": 100 };
    let pearParams = { "name": "Pear", "calories": 220 };
    let banana = await Food.create(bananaParams);
    let apple = await Food.create(appleParams);
    let pear = await Food.create(pearParams);
    let response = await request(app).get("/api/v1/foods")

    expect(response.body.length).toEqual(3),
    expect(Object.keys(response.body[0])).toContain('id')
    expect(Object.keys(response.body[0])).toContain('name'),
    expect(Object.keys(response.body[0])).toContain('calories')
  });

  test('should return a single food object', async () => {
    let response = await request(app).get(`/api/v1/foods/1`)
    expect(response.body['id']).toEqual(1)
    expect(response.body['name']).toEqual('Banana')
    expect(response.body['calories']).toEqual(150)
  });
});
