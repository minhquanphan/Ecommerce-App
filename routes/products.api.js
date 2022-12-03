const express = require("express");
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
const router = express.Router();

router.get("/product", getAllProducts);

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
