var express = require("express");
var router = express.Router();
var Meal = require('../../../../models').Meal;
var Food = require('../../../../models').Food;
var MealFood = require('../../../../models').MealFood;
var defaultHeader = ["Content-Type", "application/json"];

/* GET all meals */
router.get("/", async function (req, res, next) {
  try {
    let meals = await Meal.findAll({
      include: [{ model: Food }]
    });
    res.setHeader(...defaultHeader);
    res.status(200).send(JSON.stringify(meals, ['id', 'name', 'Food', 'id', 'name', 'calories']));
  } catch (error) {
    res.setHeader(...defaultHeader);
    res.status(500).send({ error })
  }
});

/* Add food to meal */
router.post("/:meal_id/foods/:food_id", async function (req, res, next) {
  try {
    let meal = await Meal.findOne({
      where: {id: req.params.meal_id}
    })
    let food = await Food.findOne({
      where: {id: req.params.food_id}
    })
    let mealfood = await MealFood.create({
      FoodId: req.params.food_id,
      MealId: req.params.meal_id
    })
    let message = await `Successfully added ${food.name} to ${meal.name}`
    res.setHeader(...defaultHeader);
    res.status(201).send(JSON.stringify(message));
  } catch {
    let error = await 'Food Not Added to Meal'
    res.setHeader(...defaultHeader);
    res.status(404).send({ error })
  }
});

module.exports = router;
