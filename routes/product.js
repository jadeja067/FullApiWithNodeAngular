const product = require("../control/product");
const express = require("express");
const router = express.Router();

router
  .get("/getProducts", product.getProducts)
  .get("/getProducts/:uid", product.getYourProducts)
  .get("/getProduct/:id", product.getProduct)
  .post("/addProduct", product.addProducts)
  .patch("/updateProduct/:id", product.updateProductDetails)
  .delete("/removeProduct/:id", product.deleteProduct);

exports.router = router;
