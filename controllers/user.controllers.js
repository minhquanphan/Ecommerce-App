const bcrypt = require("bcryptjs/dist/bcrypt");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const User = require("../models/User");

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
  const accessToken = user.generateToken();
  return sendResponse(res, 200, true, { user, accessToken }, null, "success");
});

userController.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(409, "Incorect credentials", "login failed");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid password", "Login Error");
  }
  const accessToken = user.generateToken();
  return sendResponse(res, 200, true, { user, accessToken }, null, "Success");
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
  return sendResponse(res, 200, true, currentUser, null, "Success");
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
  return sendResponse(res, 200, true, currentUser, null, "Success");
});

module.exports = userController;
