const express = require("express");
const { route } = require("./url");
const router = express.Router();
const { handleUserSignUp, handleUserLogIn } = require("../controllers/user");

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogIn);

module.exports = router;
