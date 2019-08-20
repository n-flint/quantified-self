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

module.exports = router;
