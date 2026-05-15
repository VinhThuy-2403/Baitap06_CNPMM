const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/sale", productController.getSaleProducts);
router.get("/new", productController.getNewProducts);
router.get("/best-seller", productController.getBestSellerProducts);
router.get("/", productController.getAllProducts);

module.exports = router;