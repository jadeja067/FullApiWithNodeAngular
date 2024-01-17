const express = require("express");
const routes = express.Router();
const category = require("../control/category");
const {verify}  = require("../mddleware");

routes
  .post("/add-category", verify, category.AddCategory)
  .get("/categories", verify, category.findCategories)
  .get("/sub-categories/:id", verify, category.findSubCategories)
  .get("/categories/byid/:id", verify, category.findCategoy)
  .get("/sub-categories/byid/:id", verify, category.findSubCategoy)
  .get("/categories/byname/:name", verify, category.findCategoy)
  .get("/sub-categories/byname/:name", verify, category.findSubCategoy)
  .delete("/delete/:id", verify, category.deleteCategory)
  .delete("/sub/delete/:id", verify, category.deleteSubCategory);

exports.routes = routes;
