const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Product = require("../models/Product");

// 1. Admin can add product ✅
// 2. Admin can update product ✅
// 3. Admin can delete product ✅
// 4. Can see a detail of prodcut ✅
// 5. Users can see All products, filter by brand, search by keywords ✅

const productController = {};

productController.getAllProducts = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  // Search products by name and brand
  const allows = ["name", "brand"];
  const filterCondition = [{ isDeleted: false }];
  allows.forEach((field) => {
    if (filter[field] !== undefined) {
      filterCondition.push({
        [field]: { $regex: filter[field], $options: "i" },
      });
    }
  });
  const filterCritera = filterCondition.length ? { $and: filterCondition } : {};

  const offset = limit * (page - 1);
  const count = await Product.countDocuments(filterCritera);
  const totalPages = Math.ceil(count / limit);
  const products = await Product.find(filterCritera).skip(offset).limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { products, totalPages },
    null,
    "Success"
  );
});

productController.getDetails = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId, { isDeleted: false });
  if (!product) {
    throw new AppError(404, "Product not found", "Product not found");
  }
  return sendResponse(res, 200, true, { product }, null, "success");
});

productController.update = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  let product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found", "error");
  }
  const allows = [
    "name",
    "brand",
    "price",
    "desciption",
    "notes",
    "countInStock",
    "imageUrl",
  ];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });
  await product.save();
  return sendResponse(res, 200, true, { product }, null, "Success");
});

productController.deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true }
  );
  if (!product) {
    throw new AppError(404, "Product not found", "error");
  }
  return sendResponse(res, 200, true, { product }, null, "Success");
});

productController.addProduct = catchAsync(async (req, res, next) => {
  const { name, brand, price, desciption, notes, countInStock, imageUrl } =
    req.body;
  let product = await Product.findOne({ name: name });
  if (product) {
    throw new AppError(
      409,
      "Product with the same name already exists",
      "Error occurred"
    );
  }
  product = await Product.create({
    name,
    brand,
    price,
    desciption,
    notes,
    countInStock,
    imageUrl,
  });
  return sendResponse(res, 200, true, { product }, null, "Success");
});
module.exports = productController;
