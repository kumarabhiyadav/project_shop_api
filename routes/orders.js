const express = require("express");
const Order = require("../controllers/orders");

const router = express.Router();


router.get("/", Order.getOrders);
router.post('/',Order.createOrder);

module.exports = router;
