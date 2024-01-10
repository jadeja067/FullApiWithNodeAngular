const {Schema, default: mongoose} = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


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
    },
    user:{
        type: String,
        required: true
    }
})

const CateSchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true
    }
})


const subCateSchema = new Schema({
    subCategory: {
        type: String,
        required: true,
        unique: true
    },
    cateId: {
        type: String,
        required: true
    }
})

exports.userschema = mongoose.model('users', User)   
exports.productSchema = mongoose.model('products', product)
exports.CateSchema = mongoose.model('categories', CateSchema)
exports.subCateSchema = mongoose.model('sub-categories', subCateSchema)
