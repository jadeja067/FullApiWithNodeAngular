const { CateSchema, subCateSchema } = require("../schemas/index");

exports.findCategoy = async(req, res) => {
  try {
    const category = await CateSchema.findOne(req.params.id ? {_id: req.params.id } : {category: req.params.name})
    res.json(category).status(200)
  } catch (error) {
    res.json(error)
  }
}

exports.findSubCategoy = async(req, res) => {
  try {
    const sub_category = await subCateSchema.findOne(req.params.id ? {_id: req.params.id } : {subCategory: req.params.name})
    res.json(sub_category).status(200)
  } catch (error) {
    res.json(error)
  }
}

exports.AddCategory = async (req, res) => {

  try {
    const newCategory = new CateSchema({ category: req.body.Category });
    newCategory.save();
    const newSubCategory = new subCateSchema({
      subCategory: req.body.SubCategory,
      cateId: req.body.Category,
    });
    newSubCategory.save();
    res.json(newCategory).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.findCategories = async (req, res) => {
  try {
    const categories = await CateSchema.find()
    res.json(categories)
  } catch (error) {
    res.json(error)
  }
}

exports.findSubCategories = async (req, res) => {
  try {
    const sub_categories = await subCateSchema.find({cateId: req.params.id})
    res.json(sub_categories)
  } catch (error) {
    res.json(error)
  }
}