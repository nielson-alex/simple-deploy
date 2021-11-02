const express = require("express");
const animalController = require("../controllers/test-controller");
const router = express.Router();

router.get("/animals", animalController.getAnimals);

module.exports = router;