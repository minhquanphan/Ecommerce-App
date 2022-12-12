const express = require("express");
const { body, param } = require("express-validator");
const {
  createReview,
  edit,
  remove,
  allReviewsByProduct,
} = require("../controllers/review.controllers");
const { loginRequired } = require("../middlewares/authentication");
const { checkObjectId, validate } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create/review",
  loginRequired,
  validate([
    body("productId").exists().isString().custom(checkObjectId),
    body("rating").exists(),
    body("content").exists().isString(),
  ]),
  createReview
);

router.put(
  "/:reviewId/edit",
  loginRequired,
  validate([
    param("reviewId").exists().isString().custom(checkObjectId),
    body("content").exists().isString(),
  ]),
  edit
);

router.delete(
  "/:reviewId/remove",
  loginRequired,
  validate([param("reviewId").exists().isString().custom(checkObjectId)]),
  remove
);

router.get(
  "/:productId/all",
  validate([param("productId").exists().isString().custom(checkObjectId)]),
  allReviewsByProduct
);

module.exports = router;
