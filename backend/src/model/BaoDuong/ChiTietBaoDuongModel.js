const mongoose = require('mongoose')

const ChiTietBaoDuongSchema = new mongoose.Schema({
    stt: {
        type: Number,
    },

    km: {
        type: String,
    },

    thang: {
        type: String,
    },

    LocGioDieuHoa: {
        type: Number,
    },

    DauPhanh: {
        type: Number,
    },

    BaoDuongHeThongDieuHoa: {
        type: Number,
    },

    PinChiaKhoaDieuKhien: {
        type: Number,
    },

    PinBoTBox: {
        type: Number,
    },

    NuocLamMat: {
        type: Number,
    },

    HangMucChung: {
        type: Number,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("ChiTietBaoDuongs", ChiTietBaoDuongSchema)

//them sua xoa excel admin

