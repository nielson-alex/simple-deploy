const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

/* GET */
router.get("/get_user_by_session", authController.getUserBySession);

/* POST */
router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);

module.exports = router;