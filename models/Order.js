const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        name: { type: String, required: true, unique: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: String, required: true },
        imageUrl: { type: String, required: true },
      },
    ],
    status: { type: String, emum: ["pending", "paid"], default: "pending" },
    total: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
