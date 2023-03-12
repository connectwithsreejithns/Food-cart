const express=require('express')




const userController = require('../controllers/userController')
const requireAuth=require('../middleware/requireAuth')

const router=express.Router()



router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/check-auth',requireAuth,userController.checkAuth)
router.get('/logout',userController.logout)

router.get('/add-to-cart/:id',requireAuth,userController.addToCart)
router.get('/cart',requireAuth,userController.fetchCart)
router.get('/cart-count',requireAuth,userController.getCartCount)
router.get('/changecart-count/:id',requireAuth,userController.changeCartCount)
router.get('/changecart-countinc/:id',requireAuth,userController.changeCartCountinc)

router.get('/cartamount',requireAuth,userController.cartamount)
router.post('/ordernow',requireAuth,userController.ordernow)
router.delete('/deletecart',requireAuth,userController.deletecart)



module.exports=router