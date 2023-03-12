const express=require('express')
const adminController=require('../controllers/adminController')
const foodController = require('../controllers/foodController')
const requireAdminAuth=require('../middleware/requireAdminAuth')

const router=express.Router()

router.post('/',adminController.login)
router.get('/foodlist',requireAdminAuth,foodController.getfoods)
router.get('/check-adminauth',requireAdminAuth,adminController.checkAdminAuth)
router.get('/logout',adminController.logout)



module.exports=router