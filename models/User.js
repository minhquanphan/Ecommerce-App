const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.isDeleted;
  return obj;
};

// access token generated from the current user
userSchema.methods.generateToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("Users", userSchema);
module.exports = User;
