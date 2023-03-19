const mongoose = require('mongoose')

const datlichBaoDuongSchema = new mongoose.Schema({
    IdLoaiXe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorys"
    },

    energy: {
        type: String
    },

    BienSo: {
        type: String,
    },

    QuangDuongDi: {
        type: String,
    },

    Iddaily: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DaiLys"
    },

    IdOptionBaoDuong: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "optionBaoDuongs"
    }],

    IdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

    nhanxung: {
        type: String,
    },

    name: {
        type: String,
    },

    email: {
        type: String,
    },

    numberphone: {
        type: String,
    },

    address: {
        type: String,
    },

    mabuuchinh: {
        type: String,
    },

    address_cuthe: {
        type: String,
    },

    checkEmail: {
        type: Number,
        default: 0
    },

    IdCoVan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },

    dates: {
        type: String,
    },

    times: {
        type: String
    },

    SoLanDangKyBaoDuong: {
        type: Number
    },

    Duyet: {
        type: Number,
        default: 0
    },

    checked: {
        type: Number,
        default: 0
    },

    checkGuiThongBao: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

//them sua xoa admin, them user

module.exports = mongoose.model("datlichBaoDuongs", datlichBaoDuongSchema)

