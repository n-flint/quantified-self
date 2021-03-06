var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../../app.js');
let Food = require('../../../../models').Food
let Meal = require('../../../../models').Meal
let MealFood = require('../../../../models').MealFood
var cleanup = require('../../../../spec/helper/testCleanup');
let { sequelize } = require('../../../../models');

describe('Test GET /api/v1/meals path', () => {
  beforeEach(async () => {
    cleanup()
  });

  test('should return a 200 status', async () => {
    return request(app).get("/api/v1/meals").then(response => {
      expect(response.status).toBe(200)
    });
  });

  test('should return an array of meal objects', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let appleParams = { "name": "Apple", "calories": 100 };
    let pearParams = { "name": "Pear", "calories": 220 };
    let banana = await Food.create(bananaParams);
    let apple = await Food.create(appleParams);
    let pear = await Food.create(pearParams);

    let meal_1 = await Meal.create({name: 'breakfast'});
    let meal_2 = await Meal.create({name: 'lunch'});
    let meal_3 = await Meal.create({name: 'dinner'});

    let mealFood_1 = await MealFood.create({MealId: meal_1.id, FoodId: banana.id})
    let mealFood_2 = await MealFood.create({MealId: meal_1.id, FoodId: apple.id})
    let mealFood_3 = await MealFood.create({MealId: meal_1.id, FoodId: pear.id})

    let response = await request(app).get("/api/v1/meals")

    expect(response.body.length).toEqual(3)
    expect(Object.keys(response.body[0])).toContain('name')
    expect(Object.keys(response.body[0])).toContain('Food')
    expect(Object.keys(response.body[0].Food[0])).toContain('id')
    expect(response.body[0].Food[0]['name']).toEqual('Banana')
    expect(response.body[0].Food[0]['calories']).toEqual(150)
  });

  test('should return a single meal object', async () => {
    let pancakeParams = { "name": "Pancakes", "calories": 100 };
    let baconParams = { "name": "Bacon", "calories": 500 };

    let pancake = await Food.create(pancakeParams);
    let bacon = await Food.create(baconParams);

    let meal_1 = await Meal.create({ name: 'Breakfast' });
    let meal_2 = await Meal.create({ name: 'Lunch' });

    let mealFood_1 = await MealFood.create({ MealId: meal_1.id, FoodId: pancake.id })
    let mealFood_2 = await MealFood.create({ MealId: meal_1.id, FoodId: bacon.id })

    let response = await request(app).get(`/api/v1/meals/${meal_1.id}/foods`)

    // Not able to test for id's here, the test suite DB does not seem to be properly cleared after each test
    // ex: expect(response.body['id']).toEqual(1)
    expect(response.body['name']).toEqual('Breakfast')
    expect(response.body.Food[0]['name']).toEqual('Pancakes')
    expect(response.body.Food[0]['calories']).toEqual(100)
    expect(response.body.Food[1]['name']).toEqual('Bacon')
    expect(response.body.Food[1]['calories']).toEqual(500)
  });

  test('should return a 404 if single meal is not found by id', async () => {
    let response = await request(app).get(`/api/v1/meals/1a85/foods`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
  });

  test('should add a food to a meal', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let meal_1 = await Meal.create({name: 'breakfast'});

    let response = await request(app).post(`/api/v1/meals/${meal_1.id}/foods/${banana.id}`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual("Successfully added Banana to breakfast")
  });

  test('should return a 404 if invalid params given for adding food to meal', async () => {
    let response = await request(app).post("/api/v1/meals/100/foods/100")

    expect(response.status).toBe(404)
    expect(response.body).toEqual({"error": "Food Not Added to Meal"})
  });

  test('should delete a food from a meal', async () => {
    let bananaParams = { "name": "Banana", "calories": 150 };
    let banana = await Food.create(bananaParams);
    let meal_1 = await Meal.create({name: 'breakfast'});
    let mealFood_1 = await MealFood.create({ MealId: meal_1.id, FoodId: banana.id })

    let response = await request(app).delete(`/api/v1/meals/${meal_1.id}/foods/${banana.id}`)

    expect(response.status).toBe(204)
  });

  test('should return a 404 if invalid params for deleting food from meal', async() => {
    let response = await request(app).delete("/api/v1/meals/100/foods/100")

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
  });
});
