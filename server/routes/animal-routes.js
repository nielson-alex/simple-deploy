const express = require("express");
const animalController = require("../controllers/animal-controller");
const router = express.Router();

/* GET */
router.get("/get_animals", animalController.getAnimals);
router.get('/animal_details/:_id', animalController.getAnimalDetails);

/* POST */
router.post("/add_animal", animalController.postAddAnimal);

module.exports = router;