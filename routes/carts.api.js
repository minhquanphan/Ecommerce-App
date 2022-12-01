const express = require("express");
const {
  create,
  detail,
  allCart,
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

router.get("/all", adminRequired, loginRequired, allCart);

router.put("/:cartId/update", loginRequired, update);

router.delete("/:cartId/delete", loginRequired, deleteCart);

module.exports = router;
