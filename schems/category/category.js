const {Schema, default: mongoose} = require('mongoose')

const CateSchema = new Schema({
    category: {
        type: String,
        required: true
    }
})
exports.CateSchema = mongoose.model('categories', CateSchema)
