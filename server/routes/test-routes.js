const express = require("express");
const animalController = require("../controllers/test-controller");
const router = express.Router();

/* GET */
router.get("/animals", animalController.getAnimals);

/* POST */
router.post("/add_animal", animalController.postAddAnimal);

module.exports = router;