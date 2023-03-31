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
        default: 0
    },

    DauPhanh: {
        type: Number,
        default: 0
    },

    BaoDuongHeThongDieuHoa: {
        type: Number,
        default: 0
    },

    PinChiaKhoaDieuKhien: {
        type: Number,
        default: 0
    },

    PinBoTBox: {
        type: Number,
        default: 0
    },

    NuocLamMat: {
        type: Number,
        default: 0
    },

    HangMucChung: {
        type: Number,
        default: 0
    },

    IdLoaiXe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorys"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("ChiTietBaoDuongs", ChiTietBaoDuongSchema)

//them sua xoa excel admin

