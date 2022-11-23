const express = require("express");
const router = express.Router();

/* GET user endpoints. */
const userRouter = require("./users.api");
router.use("/users", userRouter);

module.exports = router;
