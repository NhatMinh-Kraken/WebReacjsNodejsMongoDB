
require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const cron = require('node-cron')

const { getCronJob } = require('../backend/src/controller/laithuController')

const Data = require('../backend/src/model/laithuModel')

//const connectDB = require('./Config/ConnectDB')


const app = express()
// app.use(express.json())

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '1000mb',
    extended: true
}));
app.unsubscribe(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


//Routers
app.use('/user', require('./src/router/userRouter'))
app.use('/api', require('./src/router/upload'))
app.use('/api', require('./src/router/categoryRouter'))
app.use('/api', require('./src/router/productCarRouter'))
app.use('/api', require('./src/router/laithuRouter'))
app.use('/api', require('./src/router/convertionRouter'))
app.use('/api', require('./src/router/messageRouter'))
app.use('/api', require('./src/router/categoryAccessoryRouter'))
app.use('/api', require('./src/router/dailyRouter'))

//connect to mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connected to mongodb")
})

// const date = async () => {
//     const res = await Data.find({

//     })
// }

cron.schedule(`*/30 * * * * *`, () => {
    getCronJob()
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh"
});

// connectDB()

const PORT = process.env.PORT || 26000
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT)
})






