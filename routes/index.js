const express = require("express");
const router = express.Router();

/* GET user endpoints. */
const userRouter = require("./users.api");
router.use("/users", userRouter);

/* GET product endpoints. */
const productRouter = require("./products.api");
router.use("/products", productRouter);

/* GET cart endpoints. */
const cartRouter = require("./carts.api");
router.use("/carts", cartRouter);

const reviewRouter = require("./reviews.api");
router.use("/reviews", reviewRouter);

module.exports = router;
