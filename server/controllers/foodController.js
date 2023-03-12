const Food=require('../models/foodItem')
const path=require('path')


module.exports={
    addfood:async(req,res)=>{
        try {
            const {name,price,category,description}=req.body
        
        const food=await Food.create({name,price,category,description})
        

        
        const photo=req.files.photo
        console.log(photo)
        photo.mv('images/'+food._id+'.jpg')
       
        
        res.json({food})
    
        } catch (error) {
            console.log('///////error',error)
        }
        

    },
    getfoods:async(req,res)=>{
        const food=await Food.find()
        res.json({food})
    },
    getfood:async(req,res)=>{
        foodID=req.params.id
        const food=await Food.findById(foodID)
        res.json({food})
    },
    updatefood:async(req,res)=>{
    
        const id=req.params.id
        const {name,price,category,description}=req.body
        const photo=req.files.photo
    
        try {
            await Food.findByIdAndUpdate(id,{name,price,category,description}) 
            
            photo.mv('images/'+id+'.jpg')
            
        } catch (error) {
            console.log(error)
        }
        
        const food=await Food.findById(id)
        res.json({food})
    },
    deletefood:async(req,res)=>{
        const id=req.params.id
        await Food.findByIdAndDelete(id)
        res.json({success:'deleted'})
    }
}