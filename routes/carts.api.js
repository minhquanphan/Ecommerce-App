const express = require("express");
const {
  create,
  detail,
  update,
  deleteCart,
} = require("../controllers/cart.controllers");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", loginRequired, create);

router.get("/:cartId", loginRequired, detail);

router.put("/:cartId/update", loginRequired, update);

router.delete("/:cartId/delete", loginRequired, deleteCart);

module.exports = router;
