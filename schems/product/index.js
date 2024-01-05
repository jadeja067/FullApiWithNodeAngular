const { Schema, default: mongoose } = require('mongoose')

const product = new Schema({
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    }
})

exports.productSchema = mongoose.model('products', product)