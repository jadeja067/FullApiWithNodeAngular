const { subCateSchema } = require('../../schems/category/subCategory')

exports.AddSubCategory = async (req, res) => {
    console.log(4, req.body.SubCategory)
    try {
        const newSubCategory = new subCateSchema({subCategory: req.body.SubCategory})
        newSubCategory.save()
        console.log(newSubCategory)
        res.json(newSubCategory).status(200)
    } catch (error) {
        res.json(error)
    }
}