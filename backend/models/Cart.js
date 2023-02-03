const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    qty: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true } //CreatedAt & UpdatedAt
);

const Cart = mongoose.model("Carts", cartSchema);
module.exports = Cart;
