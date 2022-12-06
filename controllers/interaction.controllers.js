// 5. User can make a reaction (like, dislike) to each other review ✅

const mongoose = require("mongoose");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Interaction = require("../models/Interaction");

const interactionController = {};

interactionController.emoji = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { targetType, targetId, emoji } = req.body;
  const collectionName = mongoose.model(targetType);
  let target = await collectionName.findOne({ _id: targetId });
  if (!target) {
    throw new AppError(404, "Review not found", "Create reactions error");
  }

  let reaction = await Interaction.findOne({
    targetType,
    targetId,
    author: currentUserId,
  });

  let message = "";
  if (!reaction) {
    await Interaction.create({
      targetType,
      targetId,
      author: currentUserId,
      emoji,
    });
  } else if (reaction.emoji === emoji) {
    await reaction.delete();
    message = "Delete reaction";
  } else {
    reaction.emoji = emoji;
    await reaction.save();
    message = "Change reaction emoji";
  }

  const reactions = await Interaction.find({ targetType, targetId });

  sendResponse(res, 200, true, reactions, null, message);
});

interactionController.allReactionsBySingleTarget = catchAsync(
  async (req, res, next) => {
    const { targetType, targetId } = req.body;
    const collectionName = mongoose.model(targetType);
    const target = await collectionName.findOne({ _id: targetId });
    if (!target) {
      throw new AppError(404, "Review not found");
    }
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 15;
    const count = await Interaction.countDocuments({ isDeleted: false });
    const offset = limit * (page - 1);
    const totalPages = Math.ceil(count / limit);
    let reactions = await Interaction.find({ targetId, targetType })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author");

    return sendResponse(
      res,
      200,
      true,
      { reactions, totalPages },
      null,
      "Success"
    );
  }
);

module.exports = interactionController;
