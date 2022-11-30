const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    notes: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true } //CreatedAt & UpdatedAt
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
