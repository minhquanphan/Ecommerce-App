const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    content: { type: String, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true } //CreatedAt & UpdatedAt
);

const Review = mongoose.model("Reviews", reviewSchema);
module.exports = Review;
