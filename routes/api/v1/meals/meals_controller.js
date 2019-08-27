var express = require("express");
var router = express.Router();
var foods = require('../../../../models').Food;
var Meal = require('../../../../models').Meal;
var defaultHeader = ["Content-Type", "application/json"];

/* GET all meals */
router.get("/", async function (req, res, next) {
  try {
    let meals = await Meal.findAll({
      include: foods
    });
    res.setHeader(...defaultHeader);
    res.status(200).send(JSON.stringify(meals, ['id', 'name', 'Food', 'id', 'name', 'calories']));
  } catch {
    let error = 'you done goofed'
    res.setHeader(...defaultHeader);
    res.status(500).send({ error })
  }
});

// get a single meals foods
router.get("/:meal_id/foods", async function (req, res, next) {
  try {
    let meal = await Meal.findOne({
      where: {id: req.params.meal_id},
      include: foods
    });
    console.log(meal)
    res.setHeader(...defaultHeader);
    res.status(200).send(JSON.stringify(meal, ['id', 'name', 'Food', 'id', 'name', 'calories']));
  } catch {
    let error = 'you done goofed'
    res.setHeader(...defaultHeader);
    res.status(404).send({ error })
  }
});

module.exports = router;