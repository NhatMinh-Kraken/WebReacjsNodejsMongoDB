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

    HoanThanh: {
        type: Number,
        default: 0
    },

    NgayHoanThanh: {
        type: String,
        default: "chưa có"
    },

    ThoiGianHoanThanh: {
        type: String,
        default: "chưa có"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("optionBaoDuongs", optionBaoDuongSchema)


//them sua xoa user

