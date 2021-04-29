const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Orders = require("../model/Orders");

exports.getOrders = asyncHandler(async (req, res, next) => {
    const orders = await Orders.find(req.query);
  
    res.status(200).json({ success: true, orders });
  });


  exports.createOrder = asyncHandler(async (req, res, next) => {
    const order= await Orders.create(req.body);

    res.status(200).json({ success: true, order });
  });
  