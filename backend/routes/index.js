const express = require("express");
const router = express.Router();

/* GET auth endpoints. */
const authRouter = require("./auth.api");
router.use("/auth", authRouter);

/* GET user endpoints. */
const userRouter = require("./users.api");
router.use("/users", userRouter);

/* GET product endpoints. */
const productRouter = require("./products.api");
router.use("/products", productRouter);

/* GET review endpoints. */
const reviewRouter = require("./reviews.api");
router.use("/reviews", reviewRouter);

/* GET interaction endpoints. */
const interactionRouter = require("./interactions.api");
router.use("/interactions", interactionRouter);

module.exports = router;
