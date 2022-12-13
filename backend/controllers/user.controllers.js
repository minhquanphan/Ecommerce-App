const bcrypt = require("bcryptjs/dist/bcrypt");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Cart = require("../models/Cart");
const User = require("../models/User");

// 1. User can create account with email and password ✅
// 2. Owner can update own account profile ✅
// 3. Owner can see own account profile ✅
// 4. Current user can see list of orders ✅
// 5. Users can change password ✅
// 6. Users can checkout and pay for cart ✅
// 7. Users can top-up balance ✅

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    throw new AppError(409, "already registered", "login failed");
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({ name, email, password });
  return sendResponse(res, 200, true, { user }, null, "success");
});

userController.profile = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const currentUser = await User.findById(currentUserId);

  if (!currentUser) {
    throw new AppError(404, "User not found", "Error");
  }

  return sendResponse(res, 200, true, { currentUser }, null, "Success");
});

userController.updateProfile = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const currentUser = await User.findById(currentUserId);

  if (!currentUser) {
    throw new AppError(404, "User not found", "Error");
  }
  const allows = ["name", "gender"];

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      currentUser[field] = req.body[field];
    }
  });
  await currentUser.save();

  return sendResponse(res, 200, true, { currentUser }, null, "Success");
});

userController.changePassword = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { password } = req.body;

  let currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    throw new AppError(404, "User not found", "Error");
  }

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  currentUser = await User.findByIdAndUpdate(
    currentUserId,
    { password: newPassword },
    { new: true }
  );

  return sendResponse(res, 200, true, { currentUser }, null, "Success");
});

userController.myCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const count = await Cart.countDocuments({ isDeleted: false });
  const offset = limit * (page - 1);
  const totalPages = Math.ceil(count / limit);

  const cart = await Cart.find({ author: currentUserId, isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  if (!cart) {
    throw new AppError(401, "Cart not found");
  }

  return sendResponse(res, 200, true, { cart, totalPages }, null, "Success");
});

userController.topUpBalance = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { balanceAmount } = req.body;

  let user = await User.findById(currentUserId);
  if (!user) {
    throw new AppError(404, "User not found", "error");
  }

  const previousBalance = user.balance;

  user = await User.findByIdAndUpdate(
    { _id: currentUserId },
    {
      balance: previousBalance + balanceAmount,
    },
    { new: true }
  );

  return sendResponse(res, 200, true, { user }, null, "Successfull top up");
});

userController.paymentCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { cartId } = req.params;

  let currentUser = await User.findById(currentUserId);

  //find the order to pay
  let cartPending = await Cart.findOne({
    _id: cartId,
    author: currentUserId,
    status: "pending",
    isDeleted: false,
  });

  if (!cartPending) {
    throw new AppError(401, "No pending order found", "error");
  }

  let total = cartPending.total;
  let balance = currentUser.balance;

  //check balance
  if (total > balance) {
    throw new AppError(403, "Balance not enough", "Top up now");
  }

  //update new balance
  currentUser = await User.findByIdAndUpdate(
    { _id: currentUserId },
    { balance: balance - total }
  );

  //update new order
  cartPending = await Cart.findByIdAndUpdate(
    {
      _id: cartId,
    },
    { status: "paid" },
    { new: true }
  );

  return sendResponse(res, 200, true, { cartPending }, null, "Payment Success");
});

module.exports = userController;
