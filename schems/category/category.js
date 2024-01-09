const {Schema, default: mongoose} = require('mongoose')

const CateSchema = new Schema({
    category: {
        type: string,
        required: true
    }
})
exports.CateSchema = mongoose.model('categories', CateSchema)
