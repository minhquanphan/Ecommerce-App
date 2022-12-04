const express = require("express");
const { param, body } = require("express-validator");
const {
  register,
  login,
  updateProfile,
  changePassword,
  paymentCart,
  myCart,
  topUpBalance,
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
  validate([body("password").exists().notEmpty()]),
  changePassword
);

router.put(
  "/:cartId/payment",
  loginRequired,
  validate([param("cartId").exists().isString().custom(checkObjectId)]),
  paymentCart
);

router.get("/cart", loginRequired, myCart);

router.put(
  "/topup",
  loginRequired,
  validate([body("balanceAmount").exists().notEmpty()]),
  adminRequired,
  topUpBalance
);

module.exports = router;
