const express = require("express");
const environmentTestingController = require("../controllers/environment-testing-controller");
const router = express.Router();

/* GET */
router.get("/get_test", environmentTestingController.getTest);
router.get("/get_all_tests", environmentTestingController.getAllTests);

/* POST */
router.post("/post_add_test", environmentTestingController.postAddTest);

module.exports = router;