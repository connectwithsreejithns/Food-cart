const express=require('express')
const foodController=require('../controllers/foodController')
const requireAuth=require('../middleware/requireAuth')
const requireAdminAuth=require('../middleware/requireAdminAuth')

// const multer = require('multer')///multer step1
// const path=require("path")//2


const router=express.Router()



        // const storage = multer.diskStorage({
        //     destination: function (req, file, cb) {
        //       cb(null, 'images')
        //     },
        //     filename: function (req, file, cb) {
        //       console.log('///////#########',req.food)
        //       cb(null, Date.now()+path.extname(file.originalname))
        //     }
        //   })
        // const upload = multer({ storage: storage })
        // upload.single('photo'),



router.get('/',requireAuth,foodController.getfoods)
router.get('/getfood/:id',requireAdminAuth,foodController.getfood)
router.post('/add-food',requireAdminAuth,foodController.addfood)
router.put('/edit-food/:id',requireAdminAuth,foodController.updatefood)
router.delete('/delete-food/:id',requireAdminAuth,foodController.deletefood)

module.exports=router