const express = require("express");
const resumeController = require("../controllers/resume-controller");
const router = express.Router();

/* GET */
router.get("/get_all_work_experience", resumeController.getAllWorkExperience);

/* POST */
router.post("/add_work_experience", resumeController.postAddWorkExperience);

module.exports = router;