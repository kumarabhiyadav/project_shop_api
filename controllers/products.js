const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../model/Product");

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find(req.query);
  res.status(201).json({ success: true, products });
});
exports.getProductsInvitation = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`product not found with id of ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, data: product["_doc"]["inviteSalesman"] });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  //Error check product id firrst than update
  console.log(req.body);
  const product = await Product.find(
    { _id: req.params.id },
    {
      $push: { inviteSalesman: req.body },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    return res.status(400).json({ success: false, body: `Not product By ID` });
  }
  
  res.status(200).json({
    success: true,
    body: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  await product.remove();

  res.status(200).json({
    success: true,
    body: product,
  });
});
