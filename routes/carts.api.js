const express = require("express");
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
const router = express.Router();

router.post("/create", loginRequired, create);

router.get("/:cartId/detail", loginRequired, detail);

router.put("/:cartId/update", loginRequired, update);

router.delete("/:cartId/delete", loginRequired, deleteCart);

router.get("/all", loginRequired, adminRequired, getAllCarts);

module.exports = router;
