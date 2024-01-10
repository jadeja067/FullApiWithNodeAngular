const product = require("../control/product");
const express = require("express");
const router = express.Router();

router
  .post("/addProduct", product.addProducts)
  .get("/getProducts", product.getProducts)
  .get("/getProduct/:id", product.getProduct)
  .patch("/updateProduct/:id", product.updateProductDetails)
  .delete('/removeProduct/:id', product.deleteProduct).get('/some', product.something)

exports.router = router;
