const mongoose = require('mongoose')

const laithuSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

    phone: {
        type: String
    },

    nhanxung: {
        type: Number
    },

    Idcar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCars"
    },

    type: {
        type: String,
    },

    Iddaily: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DaiLys"
    },

    dates: {
        type: String
    },

    times: {
        type: String
    },

    checkedEmail: {
        type: Number,
        default: 0
    },

    checked: {
        type: Number,
        default: 0
    },

    duyet: {
        type: Number,
        default: 0
    },

    checkGuiThongBao: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("LaiThus", laithuSchema)

