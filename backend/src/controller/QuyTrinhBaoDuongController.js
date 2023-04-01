// const db = require('../models/index')
const Data = require('../model/BaoDuong/QuyTrinhBaoDuong')
const DataOption = require('../model/BaoDuong/optionBaoDuongModel')

const moment = require('moment')
const EmailChoKhachHangBaoDuong = require('./Email/EmailChoKhachHangBaoDuong')
const EmailChoCoVanBaoDuong = require('./Email/EmailChoCoVanBaoDuong')

const QuyTrinhBaoDuongController = {
    get: async (req, res) => {
        try {
            const get = await Data.find().populate("IdDonDatLichBaoDuong")
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
        try {

            const { IdDonDatLichBaoDuong, IdOptionBaoDuongB1, IdOptionBaoDuongB2 } = req.body

            const newCategory = new Data({
                IdDonDatLichBaoDuong,
                Buoc1: {
                    IdOptionBaoDuongB1
                },
                Buoc2: {
                    IdOptionBaoDuongB2
                },
            })
            await newCategory.save()

            res.json('Create Sussecc')
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    delete: async (req, res) => {
        try {
            const category = await Data.findOne({
                _id: req.params.id
            })

            if (!category) {
                res.json({
                    msg: "Not Category"
                })
            }

            await Data.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { IdOptionBaoDuongB1, HoanThanhB1, IdOptionBaoDuongB2, HoanThanhB2, GhiChu, HoanThanhTatCa } = req.body
            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                Buoc1: {
                    IdOptionBaoDuongB1, HoanThanhB1
                },
                Buoc2: {
                    IdOptionBaoDuongB2, HoanThanhB2
                },
                GhiChu,
                HoanThanhTatCa
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateOption: async (req, res) => {
        try {
            const { HoanThanh, IdOption } = req.body
            const date = moment(new Date()).format('DD-MM-YYYY')
            const time = moment(new Date()).format('h:mm:ss')

            // const get = await Data.findOne({ IdDonDatLichBaoDuong: req.params.id, })

            // if (get) {
            await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id,
                'Buoc1.IdOptionBaoDuongB1._id': IdOption
            }, {
                $set: {
                    "Buoc1.IdOptionBaoDuongB1.$.HoanThanh": HoanThanh,
                    "Buoc1.IdOptionBaoDuongB1.$.NgayHoanThanh": date,
                    "Buoc1.IdOptionBaoDuongB1.$.ThoiGianHoanThanh": time
                }
            })
            res.json({ msg: "Đã hoàn thành!" })
            //}
            // else {
            //     console.log("lỗi")
            // }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateOptionB2: async (req, res) => {
        try {
            const { HoanThanh, IdOption } = req.body
            const date = moment(new Date()).format('DD-MM-YYYY')
            const time = moment(new Date()).format('h:mm:ss')

            // const get = await Data.findOne({ IdDonDatLichBaoDuong: req.params.id, })

            // if (get) {
            await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id,
                'Buoc2.IdOptionBaoDuongB2._id': IdOption
            }, {
                $set: {
                    "Buoc2.IdOptionBaoDuongB2.$.HoanThanh": HoanThanh,
                    "Buoc2.IdOptionBaoDuongB2.$.NgayHoanThanh": date,
                    "Buoc2.IdOptionBaoDuongB2.$.ThoiGianHoanThanh": time
                }
            })
            res.json({ msg: "Đã hoàn thành!" })
            // }
            // else {
            //     console.log("lỗi")
            // }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateOptionBuoc1: async (req, res) => {
        try {
            const { HoanThanhB1, GiaiDoan } = req.body
            const date = moment(new Date()).format('DD-MM-YYYY')
            const time = moment(new Date()).format('h:mm:ss')
            await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id
            }, {
                $set: {
                    GiaiDoan,
                    "Buoc1.HoanThanhB1": HoanThanhB1,
                    "Buoc1.NgayCapNhatB1": date,
                    "Buoc1.ThoiGianCapNhatB1": time,
                }
            })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateOptionBuoc2: async (req, res) => {
        try {
            const { HoanThanhB2, GiaiDoan } = req.body
            const date = moment(new Date()).format('DD-MM-YYYY')
            const time = moment(new Date()).format('h:mm:ss')
            await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id
            }, {
                $set: {
                    GiaiDoan,
                    "Buoc2.HoanThanhB2": HoanThanhB2,
                    "Buoc2.NgayCapNhatB2": date,
                    "Buoc2.ThoiGianCapNhatB2": time,
                }
            })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateOptionVeBuoc1: async (req, res) => {
        try {
            const { HoanThanhB2, GiaiDoan } = req.body
            await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id
            }, {
                $set: {
                    GiaiDoan,
                }
            })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateOptionVeBuoc2: async (req, res) => {
        try {
            const { HoanThanhB2, GiaiDoan } = req.body
            await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id
            }, {
                $set: {
                    GiaiDoan,
                }
            })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateGuiThongtinMailKhachHangBaoDuong: async (req, res) => {
        try {
            const { khachhang, GuiMailKhachHang } = req.body

            const get = await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id
            }, {
                $set: {
                    GuiMailKhachHang
                }
            })

            EmailChoKhachHangBaoDuong(khachhang)

            res.json({ msg: "Gửi gmail cho khách hàng thành công" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateGuiThongtinMailCoVanBaoDuong: async (req, res) => {
        try {
            const { khachhang, GuiMailCoVan } = req.body

            const get = await Data.updateOne({
                IdDonDatLichBaoDuong: req.params.id
            }, {
                $set: {
                    GuiMailCoVan
                }
            })

            EmailChoCoVanBaoDuong(khachhang.IdCoVan)

            res.json({ msg: "Gửi gmail cho cố vấn thành công" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = QuyTrinhBaoDuongController