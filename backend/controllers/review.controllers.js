// 1. Author can create review ✅
// 2. Get detail of an review by its ID ✅
// 3. Users can see all review of product ✅
// 4. Users can Edit Review, Delete Review ✅

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Product = require("../models/Product");
const Review = require("../models/Review");

const reviewController = {};

reviewController.createReview = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { productId, rating, content, image } = req.body;
  const product = await Product.findOne({ _id: productId, isDeleted: false });
  if (!product) {
    throw new AppError(404, "Product not found", "Error");
  }
  let review = await Review.create({
    author: currentUserId,
    product: productId,
    rating: rating,
    content: content,
    image: image,
  });
  return sendResponse(res, 200, true, { review }, null, "Success");
});

reviewController.edit = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId, isDeleted: false });
  if (!review) {
    throw new AppError(404, "Review not found", "Error");
  }
  if (!review.author.equals(currentUserId)) {
    throw new AppError(401, "Unauthorized");
  }
  const allows = ["content", "image"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      review[field] = req.body[field];
    }
  });
  await review.save();
  return sendResponse(res, 200, true, { review }, null, "Success");
});

reviewController.remove = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { reviewId } = req.params;
  const review = await Review.findByIdAndDelete({
    _id: reviewId,
    isDeleted: false,
  });
  if (!review) {
    throw new AppError(404, "Review not found", "Error");
  }
  if (!review.author.equals(currentUserId)) {
    throw new AppError(401, "Unauthorized");
  }
  return sendResponse(res, 200, true, {}, null, "Success");
});

reviewController.allReviewsByProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found", "Error");
  }
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 15;
  const count = await Review.count({ isDeleted: false });
  const offset = limit * (page - 1);
  const totalPages = Math.ceil(count / limit);
  const productReviews = await Review.find({
    product: productId,
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  return sendResponse(
    res,
    200,
    true,
    { productReviews, totalPages },
    null,
    "Success"
  );
});

module.exports = reviewController;
