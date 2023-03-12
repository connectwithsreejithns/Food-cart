const User = require('../models/user')
const Cart = require('../models/cart')
const Food = require('../models/foodItem')
const Order =require('../models/order')


const { ObjectId } = require('mongodb');


var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
//const ObjectId = require('mongodb').ObjectId

module.exports = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const hashPassword = bcrypt.hashSync(password, 8);
            await User.create({ name, email, password: hashPassword })
            console.log('////////////try')
            res.status(200).json({message:"Account Registered Successfully"})
        } catch (error) {
            console.log(error)
            console.log('//////catch')
            res.status(400).json({message:"E-mail Already exists!"})
        }
    },
    login: async (req, res) => {

        try {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user) { return res.sendStatus(401) }

            const passwordMatch = bcrypt.compareSync(password, user.password)
            if (!passwordMatch) { res.sendStatus(401) }

            const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
            const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

            res.cookie('Authorization', token, {
                expires: new Date(exp),
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            })

            //send token
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            res.sendStatus(401)
        }
    },
    logout: (req, res) => {
        try {
            res.clearCookie('Authorization')
            res.send(200)
        } catch (error) {
            res.sendStatus(400)
        }
    },
    addToCart: async (req, res) => {
        try {
            userId = req.user._id
            foodID = req.params.id


            cart = await Cart.findOne({ user: userId })
            if (cart) {

                food = await Cart.findOne({ 'products.item': foodID })
                if (food) {
                    await Cart.updateOne({ 'products.item': foodID },
                        {
                            $inc: {
                                'products.$.quantity': 1

                            }
                        }, { multi: true }
                    )
                        res.sendStatus(200)
                } else {

                    await Cart.findOneAndUpdate({ user: userId },
                        {
                            $push: {
                                products: {
                                    item: foodID,
                                    quantity: 1
                                }
                            }
                        }

                    )
                    res.sendStatus(200)
                }
            } else {
                test = await Cart.create([{ user: userId, products: { item: (foodID), quantity: 1 } }])
                res.sendStatus(200)
            }

        } catch (error) {
            console.log('///', error)

        }
    },
    checkAuth: (req, res) => {
        try {
            res.status(200).json({loggedIn:"true"})
        } catch (error) {
            res.status(400).json({loggedIn:"false"})
        }

    },
    fetchCart: async (req, res) => {
        try {
            userId = req.user._id
            

            
            const cart = await Cart.aggregate([
                {
                    $match: { user: userId }
                },

                {
                    $unwind: '$products'
                },

                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup:
                    {
                      from: 'foods',
                      localField: 'item',
                      foreignField: '_id',
                      as: 'food'
                    }
                },
                {
                    ///convert project array to object to use in cartr quan + -
                    $project: {
                        item: 1, quantity: 1, food: { $arrayElemAt: ['$food', 0] } //0 r 1 to wanted { $arrayElemAt: ['$product', 0] }

                    }
                }
               

            ])


            res.json({cart})
            console.log('+++++++++++++++', cart)
        } catch (error) {
            console.log('///////', error)
            res.sendStatus(400)
        }
    },
    getCartCount:  async(req, res) => {
        userId=req.user._id
        cartcount=0
        cart = await Cart.findOne({ user: userId })
        if(cart){
            cartcount=cart.products.length
            res.json({cartcount})
        }
    },
    changeCartCount:  async(req, res) => {
        userId=req.user._id
        foodID=req.params.id
        cart = await Cart.findOne({ user: userId })
        if(cart){
            food = await Cart.findOne({ 'products.item': foodID })
            if(food){
                await Cart.updateOne({ 'products.item': foodID },
                        {
                            $inc: {
                                'products.$.quantity': 1

                            }
                        }, { multi: true })
                        res.sendStatus(200)
            }
            
        }
    },
    changeCartCountinc:  async(req, res) => {
        userId=req.user._id
        foodID=req.params.id
        cart = await Cart.findOne({ user: userId })
        if(cart){
            food = await Cart.findOne({ 'products.item': foodID })
            if(food){
                await Cart.updateOne({ 'products.item': foodID },
                        {
                            $inc: {
                                'products.$.quantity': -1

                            }
                        }, { multi: true })
                        res.sendStatus(200)
            }
            
        }
    },
    cartamount: async(req,res)=>{
        try {
            userId = req.user._id
            

            
            const cart = await Cart.aggregate([
                {
                    $match: { user: userId }
                },

                {
                    $unwind: '$products'
                }
            ])

            console.log(cart)
        } catch (error) {
            console.log('error')
        }
    },
    ordernow:async(req,res)=>{
        try {
            const { housename,address,city,products,total } = req.body
            const date=new Date()
            await Order.create({ housename,address,city,date,products,  })
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    },
    deletecart:async(req,res)=>{
        try {
            userId=req.user._id
            console.log('////////////////////',userId)
            await Cart.deleteOne({user:userId})
        } catch (error) {
            console.log('__________',error)
            res.sendStatus(400)
        }
    }
}
