const mongoose = require("mongoose");
const OrdersSchema = new mongoose.Schema({
  salesmanUID: {
    type: String,
    trim: true,
    required: [true, "Please add salesman"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a description"],
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      productId: {
        type: String,
        required: [true],
      },
      price: {
        type: Number,
        required: [true],
      },
      quantity: {
        type: Number,
        required: [true],
      },
      title: {
        type: String,
        required: [true],
      },
    },
  ],
});
module.exports = mongoose.model('Orders',OrdersSchema);