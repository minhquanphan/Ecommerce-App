const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interactionSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    targetType: { type: String, required: true, enum: ["Reviews"] },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },
    emoji: { type: String, enum: ["like", "dislike"] },
  },
  { timestamps: true }
);

const Interaction = mongoose.model("Interactions", interactionSchema);
module.exports = Interaction;
