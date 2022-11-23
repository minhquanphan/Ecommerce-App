const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    notes: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
