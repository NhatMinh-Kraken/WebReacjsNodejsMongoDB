const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    jokeId: {
        type: String
    },
    name: {
        type: String,
        require: [true, "Please enter your name!"],
    },

    email: {
        type: String,
        require: [true, "Please enter your email!"],
    },

    password: {
        type: String,
        require: [true, "Please enter your password!"],
    },

    role: {
        type: Number,
        default: 0, // 0 = user, 1 = admin
    },

    avatar: {
        type: String,
        default: "https://res.cloudinary.com/admincar/image/upload/v1664688949/avatar/Pngtree_user_icon_5097430_xleluw.png"
    },

    numberphone: {
        type: String,
        default: "0",
    },

    address: {
        type: String,
        default: "chưa có",
    },

    cityId: {
        type: Number,
        default: 0,
    },

    districtId: {
        type: Number,
        default: 0,
    },

    wardId: {
        type: Number,
        default: 0,
    },

    sex: {
        type: Number,
        default: 0,
    },

    date: {
        type: String,
        default: null,
    },

    nameCity: {
        type: String,
        default: "chưa có",
    },
    nameDis: {
        type: String,
        default: "chưa có",
    },
    nameWard: {
        type: String,
        default: "chưa có",
    },
    newMessages: {
        type: Object,
        default: {}
    },
    notification: {
        type: Array,
    },
    status: {
        type: String,
        default: "online"
    },
    chucvu: {
        type: String,
        default: "Chưa có"
    },
    chucvucuthe: {
        type: Number,
        default: 0
    },

    IdOptionBaoDuong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "optionBaoDuongs"
    },

    IdRank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ranks"
    }
}, {
    timestamps: true,
    minimize: false
})

module.exports = mongoose.model("Users", userSchema)

