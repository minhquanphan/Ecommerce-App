const express = require("express");
const { param } = require("express-validator");
const {
  getAllProducts,
  getDetails,
  update,
  deleteProduct,
  addProduct,
} = require("../controllers/product.controllers");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.get("/product", getAllProducts);

router.get(
  "/:productId",
  validate([param("productId").exists().isString().custom(checkObjectId)]),
  getDetails
);

router.put(
  "/:productId/update",
  loginRequired,
  adminRequired,
  validate([param("productId").exists().isString().custom(checkObjectId)]),
  update
);

router.delete(
  "/:productId/delete",
  loginRequired,
  adminRequired,
  validate([param("productId").exists().isString().custom(checkObjectId)]),
  deleteProduct
);

router.post("/add", loginRequired, adminRequired, addProduct);

module.exports = router;
