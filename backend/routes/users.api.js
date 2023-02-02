const express = require("express");
const { param, body } = require("express-validator");
const {
  register,
  updateProfile,
  changePassword,
  topUpBalance,
  profile,
} = require("../controllers/user.controllers");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authentication");
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

router.get("/me", loginRequired, profile);

router.put(
  "/profile",
  loginRequired,
  validate([body("name", "Invalid name").exists().notEmpty()]),
  updateProfile
);

router.put(
  "/password",
  loginRequired,
  validate([body("password").exists().notEmpty()]),
  changePassword
);

router.put(
  "/topup",
  loginRequired,
  validate([body("balanceAmount").exists().notEmpty()]),
  adminRequired,
  topUpBalance
);

module.exports = router;
