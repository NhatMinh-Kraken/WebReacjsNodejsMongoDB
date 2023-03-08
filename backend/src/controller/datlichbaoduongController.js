// const db = require('../models/index')
const Data = require('../model/BaoDuong/DatLichBaoDuongModel')
const EmailDangKyBaoDuong = require('./Email/EmailDangKyBaoDuong')
const EmailHenBaoDuong = require('./Email/EmailHenBaoDuong')
const moment = require('moment')

const datlichbaoduongController = {
    get: async (req, res) => {
        try {
            const get = await Data.find().populate("IdLoaiXe").populate("Iddaily").populate("IdUser").populate("IdCoVan")
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
        try {
            const IdOptionBaoDuong = [...req.body.IdOptionBaoDuong]
            const { IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times, TenLoaiXe, TenDaiLy, DiaChiDaiLy, TenKhachHang, EmailKhachHang, NameCoVan, SDTCoVan } = req.body

            EmailDangKyBaoDuong(IdOptionBaoDuong, IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times, TenLoaiXe, TenDaiLy, DiaChiDaiLy, TenKhachHang, EmailKhachHang, NameCoVan, SDTCoVan)

            const newGet = new Data({
                IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdOptionBaoDuong, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times
            })
            await newGet.save()

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
            const { checked, BaoDuongID } = req.body

            await Data.findOneAndUpdate({
                _id: BaoDuongID
            }, {
                checked
            })

            res.json({ msg: "Đơn hàng đã sửa thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateDuyet: async (req, res) => {
        try {
            const { Duyet } = req.body

            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                Duyet
            })

            res.json({ msg: "Đơn hàng đã sửa thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    cronEmailDenHenBaoDuong: async (req, res) => {
        try {
            const date = moment(new Date()).format('DD-MM-YYYY')
            const res = await Data.find({
                Duyet: 1
            }).populate('IdLoaiXe').populate('Iddaily').populate('IdUser').populate("IdCoVan")

            for (let i = 0; i < res.length; i++) {
                if (res[i].checkEmail === 1) {
                    if (res[i].dates === date) {
                        if (res[i].checkGuiThongBao === 0) {
                            EmailHenBaoDuong(res[i])
                            res[i].checkGuiThongBao = 1
                            await res[i].save()
                            console.log("đã gửi lịch bảo dưỡng")
                        }
                        else {
                            console.log("gửi lịch bảo dưỡng rồi")
                        }
                    }
                    else {
                        console.log("không bằng ngày bảo dưỡng")
                    }
                }
                else {
                    console.log("không gửi email bảo dưỡng được")
                }
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = datlichbaoduongController