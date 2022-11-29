const express = require("express");
const router = express.Router();

/* GET user endpoints. */
const userRouter = require("./users.api");
router.use("/users", userRouter);

/* GET product endpoints. */
const productRouter = require("./products.api");
router.use("/products", productRouter);

module.exports = router;
