const mongoose = require('mongoose')

const QuyTrinhBaoDuongSchema = new mongoose.Schema({
    IdDonDatLichBaoDuong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "datlichBaoDuongs"
    },

    Buoc1: {
        IdOptionBaoDuongB1: {
            type: Array
        },
        HoanThanhB1: {
            type: Number,
            default: 0
        },
        NgayCapNhatB1: {
            type: String,
            default: "chưa có"
        },
        ThoiGianCapNhatB1: {
            type: String,
            default: "chưa có"
        }
    },

    Buoc2: {
        IdOptionBaoDuongB2: {
            type: Array
        },
        HoanThanhB2: {
            type: Number,
            default: 0
        },
        NgayCapNhatB2: {
            type: String,
            default: "chưa có"
        },
        ThoiGianCapNhatB2: {
            type: String,
            default: "chưa có"
        }
    },

    GhiChu: {
        type: String
    },

    HoanThanhTatCa: {
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
    },

    GiaiDoan: {
        type: Number,
        default: 1
    },

    GuiMailKhachHang: {
        type: Number,
        default: 0
    },

    GuiMailCoVan: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("QuyTrinhBaoDuongs", QuyTrinhBaoDuongSchema)


//them sua xoa user
