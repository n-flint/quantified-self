var express = require("express");
var router = express.Router();
var Food = require('../../../../models').Food;
var defaultHeader = ["Content-Type", "appication/json"];

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
  var id = req.params.id
  try {
    let food = await Food.findOne({
        id: id
    });
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
    res.status(200).send(JSON.stringify(food));
  } catch {
    res.setHeader(...defaultHeader);
    res.status(400).send({ error })
  }
});

module.exports = router;
