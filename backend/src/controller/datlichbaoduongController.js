// const db = require('../models/index')
const Data = require('../model/BaoDuong/DatLichBaoDuongModel')
const EmailDangKyBaoDuong = require('./Email/EmailDangKyBaoDuong')
const EmailHenBaoDuong = require('./Email/EmailHenBaoDuong')
const moment = require('moment')
const EmailChoCoVan = require('./Email/EmailChoCoVan')

const DataQuyTrinh = require('../model/BaoDuong/QuyTrinhBaoDuong')

const datlichbaoduongController = {
    get: async (req, res) => {
        try {
            const get = await Data.find().populate("IdLoaiXe").populate("Iddaily").populate("IdOptionBaoDuong").populate("IdUser").populate("IdCoVan")
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
        try {
            const IdOptionBaoDuong = [...req.body.IdOptionBaoDuong]
            const { IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times, TenLoaiXe, TenDaiLy, DiaChiDaiLy, TenKhachHang, EmailKhachHang, NameCoVan, SDTCoVan, datesNoF, Tong, day, month, year, dayMonthYear } = req.body

            EmailDangKyBaoDuong(IdOptionBaoDuong, IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times, TenLoaiXe, TenDaiLy, DiaChiDaiLy, TenKhachHang, EmailKhachHang, NameCoVan, SDTCoVan)

            const newGet = new Data({
                IdLoaiXe, energy, BienSo, QuangDuongDi, Iddaily, IdOptionBaoDuong, IdUser, nhanxung, name, email, numberphone, address, mabuuchinh, address_cuthe, checkEmail, IdCoVan, dates, times, datesNoF, Tong, day, month, year, dayMonthYear
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
            const date = moment(new Date()).format('DD-MM-YYYY')
            const time = moment(new Date()).format('h:mm:ss')

            const get = await Data.findOneAndUpdate({
                _id: BaoDuongID
            }, {
                checked
            })

            if (get) {
                await DataQuyTrinh.updateOne({
                    IdDonDatLichBaoDuong: req.params.id
                }, {
                    $set: {
                        HoanThanhTatCa: checked,
                        NgayHoanThanh: date,
                        ThoiGianHoanThanh: time
                    }
                })
            }

            res.json({ msg: "Đơn hàng đã sửa thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateDuyet: async (req, res) => {
        try {
            const { Duyet, DonHang } = req.body

            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                Duyet
            })

            if (DonHang.IdCoVan !== undefined) {
                EmailChoCoVan(DonHang)
            }

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
            }).populate('IdLoaiXe').populate('Iddaily').populate("IdOptionBaoDuong").populate('IdUser').populate("IdCoVan")

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
    },

    huyDon: async (req, res) => {
        try {
            const { TinhTrangDonHang } = req.body

            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                TinhTrangDonHang
            })

            res.json({ msg: "Đơn hàng đã hủy thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    crQuyTrinh: async (req, res) => {
        try {
            const { TaoQuyTrinh } = req.body

            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                TaoQuyTrinh
            })

            res.json({ msg: "Tạo quy trình thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    editOptionBaoDuong: async (req, res) => {
        try {
            const check = [...req.body.check]
            const { Tong } = req.body

            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                IdOptionBaoDuong: check,
                Tong
            })

            res.json({ msg: "Sửa thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    findNVCVLength: async (req, res) => {
        try {
            const get = await Data.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'IdCoVan',
                        foreignField: '_id',
                        as: 'IdCoVan'
                    },
                },

                {
                    $unwind: "$IdCoVan"
                },

                {
                    $group: {
                        _id: "$IdCoVan",
                        records: {
                            $push: "$$ROOT"
                        },
                    }
                },
            ])

            res.json(get)

            // console.log(get)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    findKHDonBaoDuong: async (req, res) => {
        try {
            const get = await Data.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'IdUser',
                        foreignField: '_id',
                        as: 'IdUser'
                    },
                },

                {
                    $unwind: "$IdUser"
                },

                {
                    $match: {
                        checked: 1
                    }
                },

                {
                    $group: {
                        _id: "$IdUser",
                        records: {
                            $push: "$$ROOT"
                        },
                    }
                },
                {
                    $sort: { _id: 1 }
                },

            ])

            res.json(get)

            // console.log(get)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    FilterToYear: async (req, res) => {
        try {
            const get = await Data.aggregate([

                {
                    $unwind: "$year"
                },

                {
                    $group: {
                        _id: "$year",
                        records: {
                            $push: "$$ROOT"
                        },
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ])

            res.json(get)

            console.log(get)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    FilterToMonth: async (req, res) => {
        try {
            const get = await Data.aggregate([

                {
                    $unwind: "$dayMonthYear"
                },

                {
                    $group: {
                        _id: {
                            year: {
                                $year: "$dayMonthYear"
                            },
                            month: {
                                $month: "$dayMonthYear"
                            }
                        },
                        records: {
                            $push: "$$ROOT"
                        },
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ])

            res.json(get)

            console.log(get)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = datlichbaoduongController