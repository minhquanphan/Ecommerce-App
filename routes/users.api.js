const express = require("express");
const {
  register,
  login,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/profile", loginRequired, updateProfile);

router.put("/password", loginRequired, changePassword);

module.exports = router;
