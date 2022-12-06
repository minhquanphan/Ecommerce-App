const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Reaction = require("../models/Reaction");
const Review = require("../models/Review");

const reactionController = {};

reactionController.createReaction = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { reviewId, emoj } = req.body;
  const review = await Review.findOne({ _id: reviewId, isDeleted: false });
  if (!review) {
    throw new AppError(404, "Review not found", "Error");
  }

  let reaction = await Reaction.findOne({
    reviewId,
    author: currentUserId,
    emoj,
  });

  let message = "";
  if (!reaction) {
    await Reaction.create({
      reviewId,
      author: currentUserId,
      emoj,
    });
  } else if (reaction.emoj === emoj) {
    await reaction.delete();
    message = "delete reaction";
  } else {
    reaction.emoj = emoj;
    await reaction.save();
    message = "change reaction emoji";
  }

  const reactions = await Reaction.find({ reviewId });

  sendResponse(res, 200, true, reactions, null, message);
});

module.exports = reactionController;
