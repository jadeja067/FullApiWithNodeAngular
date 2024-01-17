const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./view/user");
const product = require("./view/product");
const category = require("./view/category");
const app = express();

// MaddleWare
app.use(cors());
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// connection to DB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    // Port Running if connected
    app.listen(process.env.PORT, () => console.log("listening... at 7000"));
  })
  .catch((e) => console.log(e));

// User routes
app.use("/user", users.router);

// Product routes
app.use("/product", product.router);

// Category routes
app.use("/category", category.routes);
