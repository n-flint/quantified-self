var express = require("express");
var router = express.Router();
var Food = require('../../../../models').Food;
var defaultHeader = ["Content-Type", "application/json"];

/* GET all foods */
router.get("/", async function(req, res, next) {
  try {
    let foods = await Food.findAll();
    res.setHeader(...defaultHeader);
    res.status(200).send(JSON.stringify(foods));
  } catch {
    res.setHeader(...defaultHeader);
    res.status(500).send({error})
  }
});

// GET a single food
router.get("/:id", async function (req, res, next) {
  try {
    let food = await Food.findOne({
      where: {id: req.params.id}
    });
    console.log(food)
    res.setHeader(...defaultHeader);
    res.status(200).send(JSON.stringify(food));
  } catch {
    res.setHeader(...defaultHeader);
    res.status(404).send({ error })
  }
});

router.post("/", async function (req, res, next) {
  try {
    let food = await Food.create({
      name: req.body.name,
      calories: req.body.calories
    })
    res.setHeader(...defaultHeader);
    res.status(201).send(JSON.stringify(food, ['id', 'name', 'calories']));
  } catch {
    let error = 'Food Not Created'
    res.setHeader(...defaultHeader);
    res.status(400).send({ error })
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    let food = await Food.findOne({
      where: {id: req.params.id }
    });
    if (req.body.name && req.body.calories) {
    food.update({
      name: req.body.name,
      calories: req.body.calories
    })
    } else {
      throw "You must give both name and calories"
    }
    res.setHeader(...defaultHeader);
    res.status(201).send(JSON.stringify(food, ['id', 'name', 'calories']));
  } catch {
    let error = 'Food Not Updated'
    res.setHeader(...defaultHeader);
    res.status(400).send({ error })
  }
});

// DELETE a single food
router.delete("/:id", async function (req, res, next) {
  try {
    let food = await Food.findOne({
      where: {id: req.params.id}
    });
    await food.destroy();
    res.setHeader(...defaultHeader);
    res.status(204).send()
  } catch {
    let error = "ID given does not match a food";
    res.setHeader(...defaultHeader);
    res.status(404).send({ error })
  }
});

module.exports = router;
