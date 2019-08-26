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
    res.setHeader(...defaultHeader);
    res.status(500).send({ error })
  }
});

module.exports = router;

// User.findAll({
//   include: [{
//     model: Project,
//     through: {
//       attributes: ['createdAt', 'startedAt', 'finishedAt'],
//       where: { completed: true }
//     }
//   }]
// });