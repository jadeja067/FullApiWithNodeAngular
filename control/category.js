const { CateSchema, subCateSchema } = require("../schemas/index");

exports.findCategoy = async (req, res) => {
  try {
    const category = await CateSchema.findOne(
      req.params.id ? { _id: req.params.id } : { category: req.params.name }
    );
    res.json(category).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.findSubCategoy = async (req, res) => {
  try {
    const sub_category = await subCateSchema.findOne(
      req.params.id ? { _id: req.params.id } : { subCategory: req.params.name }
    );
    res.json(sub_category).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.AddCategory = async (req, res) => {
  try {
    const category = req.body.Category.trim();
    let newCategory = await CateSchema.findOne({ category: category });
    if (!newCategory?._id) {
      newCategory = new CateSchema({ category: req.body.Category });
      newCategory.save();
    }
    const SubCategories = [];
    req.body.SubCategory?.forEach(async (el) => {
      const newSubCategory = await subCateSchema.findOne({
        subCategory: el.trim(),
        cateId: newCategory.category,
      });
      if (!newSubCategory) {
        newSubCategory = new subCateSchema({
          subCategory: el.trim(),
          cateId: newCategory.category,
        });
        newSubCategory.save();
        SubCategories.push(newSubCategory);
      }else SubCategories.push(newSubCategory)
    });
    res
      .json({
        category: newCategory,
        sub_categories: SubCategories,
      })
      .status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.findCategories = async (req, res) => {
  try {
    const categories = await CateSchema.find();
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
};

exports.findSubCategories = async (req, res) => {
  try {
    const sub_categories = await subCateSchema.find({ cateId: req.params.id });
    res.json(sub_categories);
  } catch (error) {
    res.json(error);
  }
};
