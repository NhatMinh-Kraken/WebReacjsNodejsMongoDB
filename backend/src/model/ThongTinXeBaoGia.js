const mongoose = require('mongoose')

const ThongTinXeBaoGiaSchema = new mongoose.Schema({
    Note:{
        type:String,
        default:"Ghi tên loại xe cần gắn vào"
    },

    IdCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCars"
    },

    DungTichCongTat: {
        type: String,
    },

    SoXiLanh: {
        type: String,
    },

    NamMoHinh: {
        type: String,
    },

    ChieuDai: {
        type: String,
    },

    ChieuRong: {
        type: String,
    },

    ChieuCao: {
        type: String,
    },

    KhoiLuong: {
        type: String,
    },

    TrongLuongToiDa: {
        type: String,
    },

    TocDoToiDa: {
        type: String,
    },

    SoCua: {
        type: String,
    },

    SoChoNgoi: {
        type: String,
    },

    MauNoiThat: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("ThongTinXeBaoGias", ThongTinXeBaoGiaSchema)


//them sua xoa admin excel, xem user