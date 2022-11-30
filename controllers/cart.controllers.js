// 1. User can create cart
// 2. User can see cart detail
// 3. Admin can see all cart
// 4. Users can Edit Cart, Delete Cart
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");

const cartController = {};

cartController.create = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { products } = req.body;
  let total = 0;
});

module.exports = cartController;
