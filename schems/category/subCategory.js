const {Schema, default: mongoose} = require('mongoose')

const subCateSchema = new Schema({
    subCategory: {
        type: String,
        required: true
    }
})
exports.subCateSchema = mongoose.model('sub-categories', subCateSchema)
