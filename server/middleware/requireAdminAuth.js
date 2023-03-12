const jwt = require('jsonwebtoken')
const Admin=require('../models/admin')

async function requireAdminAuth(req, res, next) {
    try {
        console.log('/////////////////////////////////')
        //read  token off cookies
        const token = req.cookies.AdminAuthorization
        console.log(token)
        //Decode the token
        const decoded = jwt.verify(token, process.env.SECRET)
        //check expiration
        if (Date.now() > decoded.exp) return res.sendStatus(401)
        //Find the admin using decoded sub
        const admin = await Admin.findById(decoded.sub)
        if (!admin) return res.sendStatus(401)
        //attach admin to req
        req.admin = admin
        
       // res.sendStatus(200)

        // //continue on
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(401)
    }

}

module.exports = requireAdminAuth