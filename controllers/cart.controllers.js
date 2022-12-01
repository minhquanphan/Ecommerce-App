// 1. User can create cart ✅
// 2. User can see cart detail ✅
// 3. Admin can see all cart ✅
// 4. Users can Edit Cart, Delete Cart ✅
// 5. Users can checkout and pay for cart ✅

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartController = {};

cartController.create = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { products } = req.body;
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    let product = await Product.findById(products[i].product);
    if (!product) {
      throw new AppError(404, "Product not found", "error");
    }
    total += product.price * products[i].qty;
  }

  const cart = await Cart.create({
    author: currentUserId,
    products,
    total,
  });

  return sendResponse(res, 200, true, { cart }, null, "Order created");
});

cartController.detail = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;

  const cart = await Cart.findOne({
    cartId,
    isDeleted: false,
  }).populate("author");

  if (!cart) {
    throw new AppError(401, "Cart not exist", "error");
  }

  return sendResponse(
    res,
    200,
    true,
    { cart },
    null,
    "Get detail order success"
  );
});

// not done yet
cartController.allCart = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const count = await Cart.countDocuments({ isDeleted: false });
  const offset = limit * (page - 1);
  const totalPages = Math.ceil(count / limit);
  let cartList = await Cart.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");

  return sendResponse(
    res,
    200,
    true,
    { cartList, totalPages },
    null,
    "Successful get cart list"
  );
});

cartController.update = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;
  const { products } = req.body;
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    let product = await Product.findById(products[i].product);
    if (!product) {
      throw new AppError(404, "Product not found", "error");
    }
    total += product.price * products[i].qty;
  }

  const cart = await Cart.findByIdAndUpdate(
    {
      _id: cartId,
      status: "pending",
    },
    { products: products, total },
    { new: true }
  );

  if (!cart) {
    throw new AppError(401, "Cart not exist", "error");
  }

  return sendResponse(res, 200, true, { cart }, null, "Success");
});

cartController.deleteCart = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;
  const cart = await Cart.findByIdAndUpdate(
    {
      _id: cartId,
    },
    { isDeleted: true },
    { new: true }
  );

  if (!cart) {
    throw new AppError(401, "Cart not exist", "error");
  }

  return sendResponse(res, 200, true, { cart }, null, "Success");
});

module.exports = cartController;
