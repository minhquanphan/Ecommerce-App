const express = require("express");
const { param, body } = require("express-validator");
const {
  create,
  detail,
  update,
  deleteCart,
  getAllCarts,
} = require("../controllers/cart.controllers");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create",
  loginRequired,
  validate([body("products").exists().notEmpty()]),
  create
);

router.get(
  "/:cartId/detail",
  loginRequired,
  validate([param("cartId").exists().isString().custom(checkObjectId)]),
  detail
);

router.put(
  "/:cartId/update",
  loginRequired,
  validate([
    param("cartId").exists().isString().custom(checkObjectId),
    body("products").exists().notEmpty(),
  ]),
  update
);

router.delete(
  "/:cartId/delete",
  loginRequired,
  validate([param("cartId").exists().isString().custom(checkObjectId)]),
  deleteCart
);

router.get("/allCart", loginRequired, adminRequired, getAllCarts);

module.exports = router;
