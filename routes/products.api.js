const express = require("express");
const { param, body, header } = require("express-validator");
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

router.get("/all", getAllProducts);

router.get("/:productId", getDetails);

router.put("/:productId/update", loginRequired, adminRequired, update);

router.delete(
  "/:productId/delete",
  loginRequired,
  adminRequired,
  deleteProduct
);

router.post("/add", loginRequired, adminRequired, addProduct);

module.exports = router;
