const mongoose = require('mongoose')

const optionBaoDuongSchema = new mongoose.Schema({
    jokeId: {
        type: String,
    },

    name: {
        type: String,
    },

    mota: {
        type: String,
    },

    money: {
        type: String,
    },

    IdLoaiDichVu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "loaiDichVus"
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("optionBaoDuongs", optionBaoDuongSchema)


//them sua xoa user

