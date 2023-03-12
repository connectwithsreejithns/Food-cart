const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String
    },
    description: {
        type: String,
        maxLength: 25
    },
    photo:{
        type: String
    }
})

const Food = mongoose.model('Food', foodSchema)
module.exports = Food