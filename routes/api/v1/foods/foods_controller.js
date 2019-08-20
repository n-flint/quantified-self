var express = require("express");
var router = express.Router();
var Food = require('../../../../models').Food;

/* GET all games */
router.get("/", async function(req, res, next) {
  let foods = await Food.findAll();
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(foods));
  // Food.findAll()
  //   .then(foods => {
  //     res.setHeader("Content-Type", "application/json");
  //     res.status(200).send(JSON.stringify(foods));
  //   })
  //   .catch(error => {
  //     res.setHeader("Content-Type", "application/json");
  //     res.status(500).send({error})
  //   });
});

module.exports = router;
