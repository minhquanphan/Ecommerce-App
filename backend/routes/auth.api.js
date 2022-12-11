const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/authcontrollers");
const { validate } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/login",
  validate([
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  login
);

module.exports = router;
