var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../../app.js');
let Food = require('../../../../models').Food;
var cleanup = require('../../../../spec/helper/testCleanup');
let {sequelize} = require('../../../../models');

describe('Test GET /api/v1/foods path', () => {
  beforeEach(async () => {
    cleanup()
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

    expect(response.body.length).toEqual(3)
    expect(Object.keys(response.body[0])).toContain('id'),
    expect(Object.keys(response.body[0])).toContain('name')
    expect(Object.keys(response.body[0])).toContain('calories')
  });

  test('should return a single food object', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let response = await request(app).get(`/api/v1/foods/${banana.id}`)
    expect(response.body['id']).toEqual(banana.id)
    expect(response.body['name']).toEqual('Banana')
    expect(response.body['calories']).toEqual(150)
  });

  test('create a new object with valid credentials', async () => {
    let response = await request(app).post(`/api/v1/foods`).send({
      name: 'foody',
      calories: 300
    })
    expect(response.status).toBe(201)
    expect(response.body['name']).toEqual('foody')
    expect(response.body['calories']).toEqual(300)
  });

  test('receives a 400 if invalid credentials are provided when creating food', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let response = await request(app).post(`/api/v1/foods`).send({
      food: {
        name: 'foody'
      }
    })
    expect(response.status).toBe(400)
  });

  test('update an existing object with valid credentials', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let response = await request(app).patch(`/api/v1/foods/${banana.id}`).send({
      name: 'mango',
      calories: 350
    })
    expect(response.status).toBe(201)
    expect(response.body['id']).toEqual(banana.id)
    expect(response.body['name']).toEqual('mango')
    expect(response.body['calories']).toEqual(350)
  });

  test('receives a 400 if credentials are missing when updating food', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let response = await request(app).patch(`/api/v1/foods/${banana.id}`).send({
      name: 'strawberry'
    })
    expect(response.status).toBe(400)
  });

  test('receives a 400 if given invalid id for updating food', async () => {
    let response = await request(app).patch(`/api/v1/foods/1000`).send({
      name: 'blueberry',
      calories: '700'
    })
    expect(response.status).toBe(400)
  });

  test('should delete a single food object', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let response = await request(app).delete(`/api/v1/foods/${banana.id}`)
    expect(response.status).toEqual(204)
  });

  test('receives a 404 if invalid id given to delete', async () => {
    let response = await request(app).delete(`/api/v1/foods/100`)
    expect(response.status).toEqual(404)
    expect(response.body).toEqual({"error": "ID given does not match a food"})
  });
});
