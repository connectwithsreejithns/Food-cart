if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()

}
    

const express = require('express')
const connectToDb=require('./config/connectToDb')
const cookieParser=require('cookie-parser')

const foodRouter=require('./routes/foodRouter')
const userRouter=require('./routes/userRouter')
const adminRouter=require('./routes/adminRouter')
const fileUpload=require('express-fileupload')
const cors=require('cors')

const app = express()
connectToDb()

// app.use(
//     express.urlencoded({ extended: true })
// );
app.use(fileUpload())
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin:true,
        credentials:true
    }
))

app.use('/',foodRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)



app.listen(process.env.PORT)