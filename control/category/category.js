const { CateSchema } = require('../../schems/category/category')
const subCategory = require('./subcategory')
exports.AddCategory = async (req, res) => {
    console.log(req.body)
    try {
        const newCategory = new CateSchema({category: req.body.Category})
        newCategory.save()
        // const newSubCategory = newSubCategory = await subCategory.AddSubCategory(req, res)
        // console.log(newCategory, newSubCategory)
        res.json(newCategory).status(200)
    } catch (error) {
        res.json(error)
    }
}