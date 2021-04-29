const express = require("express");
const Product = require("../controllers/products");

const router = express.Router();


router.get("/:id", Product.getProductsInvitation);
router.put("/:id", Product.updateProduct);
router.post('/',Product.createProduct);
router.get('/',Product.getProducts);
router.delete('/:id',Product.deleteProduct);
module.exports = router;
