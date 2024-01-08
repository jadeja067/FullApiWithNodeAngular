const product = require("../../control/product/index");
const express = require("express");
const router = express.Router();

router
  .post("/addProduct", product.addProducts)
  .get("/getProducts", product.getProducts)
  .get("/getProduct/:id", product.getProduct)
  .patch('/updateProduct/:id', product.updateProductDetails)

exports.router = router;
