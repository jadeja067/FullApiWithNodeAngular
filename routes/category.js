const express = require("express");
const routes = express.Router();
const category = require("../control/category");

routes
  .post("/add-category", category.AddCategory)
  .get("/categories", category.findCategories)
  .get("/sub-categories/:id", category.findSubCategories)
  .get("/categories/byid/:id", category.findCategoy)
  .get("/sub-categories/byid/:id", category.findSubCategoy)
  .get("/categories/byname/:name", category.findCategoy)
  .get("/sub-categories/byname/:name", category.findSubCategoy)
  .delete("/delete/:id", category.deleteCategory)
  .delete("/sub/delete/:id", category.deleteSubCategory);

exports.routes = routes;
