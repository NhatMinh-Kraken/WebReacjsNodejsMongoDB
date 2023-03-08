const mongoose = require('mongoose')

const HoaDonChiTraSchema = new mongoose.Schema({
    IdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

    IdXe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCars"
    },

    IdDatLich: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "datlichBaoDuongs"
    },

    IdOptionBaoDuong: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "optionBaoDuongs"
    }],

    BaoHiem: {
        type: String,
        default: "75%"
    },

    TongHoaDon: {
        type: String,
    },

    TienUserTra: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("HoaDonChiTras", HoaDonChiTraSchema)


//them sua xoa admin, xem user