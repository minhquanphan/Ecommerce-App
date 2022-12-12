const express = require("express");
const { body } = require("express-validator");
const {
  emoji,
  allReactionsBySingleTarget,
} = require("../controllers/interaction.controllers");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");

const router = express.Router();

router.post(
  "/emoji",
  loginRequired,
  validate([
    body("targetId").exists().isString().custom(checkObjectId),
    body("targetType").exists().isString(),
  ]),
  emoji
);

router.get(
  "/reactions",
  loginRequired,
  validate([
    body("targetId").exists().isString().custom(checkObjectId),
    body("targetType").exists().isString(),
  ]),
  allReactionsBySingleTarget
);

module.exports = router;
