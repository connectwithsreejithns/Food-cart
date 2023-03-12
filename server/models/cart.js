const mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const cartSchema = new mongoose.Schema({
    user: { //objid of user
        type: ObjectId,
        required: true,
        unique: true
    },
    products:[{
        item: {
            type:ObjectId
        },
        quantity:{
            type:Number,
            required:true
        }}]
    
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart