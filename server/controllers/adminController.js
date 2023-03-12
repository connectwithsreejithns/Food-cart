const Admin=require('../models/admin')
//var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        try {
            const{email,password}=req.body
            const admin=await Admin.findOne({email:email})
            if(!admin){return res.sendStatus(401)}
            
            // const passwordMatch= bcrypt.compareSync(password, admin.password)
            // if(!passwordMatch){res.sendStatus(401)}

            if(password==admin.password){

            const exp=Date.now() + 1000 * 60 * 60 * 24 * 30;
            const token = jwt.sign({ sub: admin._id,exp }, process.env.SECRET);

            res.cookie('AdminAuthorization',token,{
                expires: new Date(exp),
                httpOnly:true,
                sameSite:'lax',
                secure:process.env.NODE_ENV==='production'
            })
        }
            //send token
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            res.sendStatus(401)
        }
    },
    checkAdminAuth:(req,res)=>{
        console.log('///////////')
        try {
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(400)
        }
    
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie('AdminAuthorization')
            res.send(200)
        } catch (error) {
            res.sendStatus(400)
        }
    }
}