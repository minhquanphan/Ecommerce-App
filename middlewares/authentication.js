const jwt = require("jsonwebtoken");
const { AppError } = require("../helpers/utils");
const User = require("../models/User");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = {};

authMiddleware.loginRequired = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    // Bearer accessToken sent from the client
    if (!tokenString) {
      throw new AppError(401, "Token missing", "Invalid authorization");
    }
    //get token only
    const token = tokenString.replace("Bearer ", "");
    // verify token to get _id
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        throw new AppError(401, "Token Error", "Login required error");
      }
      //add _id to req.currentUserId, req will carry on
      //this value to the next cotroller
      req.currentUserId = payload._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

authMiddleware.adminRequired = async (req, res, next) => {
  try {
    const userId = req.userId;
    const currentUserId = await User.findById(userId);
    const isAdmin = currentUserId.role === "admin";
    //check admin role
    if (!isAdmin) {
      throw new AppError(401, "Admin required");
    }
    req.isAdmin = isAdmin;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
