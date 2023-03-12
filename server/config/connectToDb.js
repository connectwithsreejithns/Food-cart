const mongoose=require('mongoose')

async function connectToDb(){
    try {
        await mongoose.connect(process.env.URL);
        console.log("Database connected successfully")
    } catch (error) {
        console.log('DB not connected',error)
    }
    
}
module.exports=connectToDb