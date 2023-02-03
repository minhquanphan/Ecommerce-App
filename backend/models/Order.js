const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
    status: { type: String, emum: ["pending", "paid"], default: "pending" },
    total: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true } //CreatedAt & UpdatedAt
);

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
