const mongoose = require('mongoose')

const lichlamviecSchema = new mongoose.Schema({
    title: {
        type: String,
    },

    start: {
        type: String,
    },

    end: {
        type: String
    },

    idCoVan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

    IdDonBaoDuong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "datlichBaoDuongs"
    },

    hoanthanh: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("lichlamviecs", lichlamviecSchema)

