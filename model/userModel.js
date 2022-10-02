const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:[true, "Please enter your name!"],
        trim: true
    },

    email:{
        type: String,
        require:[true, "Please enter your email!"],
        trim: true,
        unique: true
    },

    password:{
        type: String,
        require:[true, "Please enter your password!"],
    },

    role:{
        type: Number,
        default: 0, // 0 = user, 1 = admin
    }, 

    avatar:{
        type: String,
        default: "https://res.cloudinary.com/db2i9cmoo/image/upload/v1664688949/avatar/Pngtree_user_icon_5097430_xleluw.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)

