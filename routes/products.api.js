const express = require("express");
const { param, body, header } = require("express-validator");
const {
  getAllProducts,
  getDetails,
  update,
  deleteProduct,
  addProduct,
} = require("../controllers/product.controllers");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.get("/all", getAllProducts);

router.get("/:productId", getDetails);

router.put("/:productId/update", update);

router.delete("/:productId", deleteProduct);

router.post("/add", addProduct);

module.exports = router;
