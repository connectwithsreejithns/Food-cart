const mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const orderSchema = new mongoose.Schema({
    housename: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    date: {
        type: Date
    },
    products:[{
        item: {
            type:ObjectId
        },
        quantity:{
            type:Number,
            required:true
        },
        food:{
            name:{
                type:String
            },
            price:{
                type:Number
            }
        }
    }]
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order