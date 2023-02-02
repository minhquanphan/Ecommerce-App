const bcrypt = require("bcryptjs/dist/bcrypt");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const User = require("../models/User");

// 1. User can create account with email and password ✅
// 2. Owner can update own account profile ✅
// 3. Owner can see own account profile ✅
// 4. Current user can see list of orders ✅
// 5. Users can change password ✅
// 6. Users can checkout and pay for order ✅
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

module.exports = userController;
