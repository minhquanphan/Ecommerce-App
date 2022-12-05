const express = require("express");
const { body, param } = require("express-validator");
const { loginRequired } = require("../middlewares/authentication");
const { checkObjectId, validate } = require("../middlewares/validator");
const router = require("./carts.api");

module.exports = router;
