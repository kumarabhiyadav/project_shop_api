const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Titel of Product"],
  },
  description: {
    type: String,
    required: [true, "Please add a description to product"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please add a description to product"],
  },
  publisherId: {
    type: String,
    // required: [true, "Please Enter publisherid"],
  },
  price: {
    type: String,
    required: [true, "Please price of product"],
  },
  inviteSalesMan: [
    {
      salesmanUID: { type: String },
      acceptedStatus: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Product", ProductsSchema);
