const express = require("express");
const environmentTestingController = require("../controllers/environment-testing-controller");
const router = express.Router();

/* GET */
router.get("/get_work_experience_test", environmentTestingController.getWorkExperienceTest);
router.get("/get_all_animals_test", environmentTestingController.getAllAnimalsTest);

/* POST */
router.post("/post_add_test", environmentTestingController.postAddTest);

module.exports = router;