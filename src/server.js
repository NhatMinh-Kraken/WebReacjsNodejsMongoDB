
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const connectDB = require('./Config/ConnectDB')


const app = express()
app.use(express.json())
app.unsubscribe(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//Routers
app.use('/user', require('./router/userRouter'))
app.use('/api', require('./router/upload'))

// connect to mongoDB
// const URI = process.env.MONGODB_URL
// mongoose.connect(URI, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => {
//     if (err) throw err;
//     console.log("Connected to mongodb")
// })

connectDB()

const PORT = process.env.PORT || 26000
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT)
})





