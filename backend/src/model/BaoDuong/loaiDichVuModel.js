const mongoose = require('mongoose')

const loaiDichVuSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    icon: {
        type: String,
    },

    chung: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("loaiDichVus", loaiDichVuSchema)


//them sua xoa user
