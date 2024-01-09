const { Schema, default: mongoose } = require('mongoose')

const product = new Schema({
    img: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
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