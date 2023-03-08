const mongoose = require('mongoose')

const loaiDichVuSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    icon: {
        type: String,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("loaiDichVus", loaiDichVuSchema)


//them sua xoa user
