const bcrypt = require("bcryptjs/dist/bcrypt");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const User = require("../models/User");

// 1. User can login with email and password ✅

const authController = {};

authController.login = catchAsync(async (req, res, next) => {
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

module.exports = authController;
