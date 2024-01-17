const product = require("../control/product");
const express = require("express");
const router = express.Router();
const {verify}  = require("../mddleware");

router
  .post(
    "/addProduct",
    verify,
    product.middleware,
    product.imageUpload,
    product.addProducts
  )
  .get("/getProducts", verify, product.getProducts)
  .get("/getProducts/:uid", verify, product.getYourProducts)
  .get("/getProduct/:id", verify, product.getProduct)
  .patch(
    "/updateProduct/:id",
    verify,
    product.middleware,
    product.imageUpload,
    product.updateProductDetails
  )
  .delete("/removeProduct/:id", verify, product.deleteProduct);

exports.router = router;
