const express = require("express");
const { param, body, header } = require("express-validator");
const {
  register,
  login,
  updateProfile,
  changePassword,
  paymentCart,
} = require("../controllers/user.controllers");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/register",
  validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  register
);

router.post(
  "/login",
  validate([
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  login
);

router.put(
  "/profile",
  loginRequired,
  validate([body("name", "Invalid name").exists().notEmpty()]),
  updateProfile
);

router.put(
  "/password",
  loginRequired,
  validate([body("password", "Invalid password").exists().notEmpty()]),
  changePassword
);

router.get("/:cartId/payment", loginRequired, paymentCart);

module.exports = router;
