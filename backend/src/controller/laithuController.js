// const db = require('../models/index')
const LaiThus = require('../model/laithuModel')
const sendEmailLaiThu = require('./sendMailLaiThu')
const schedule = require('node-schedule')
const cron = require('node-cron')
const moment = require('moment')
const EmailHenLaiThu = require('./Email/EmailHenLaiThu')

const LaiThuController = {
    getLaiThu: async (req, res) => {
        try {
            const laithu = await LaiThus.find().populate('idUser').populate('Idcar').populate('Iddaily')
            res.json(laithu)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    LaiThu: async (req, res) => {
        try {

            const { idUser, phone, nhanxung, Idcar, type, Iddaily, dates, times, nameCar, moneyCar, nameUser, emailUser, checkedEmail, nameDaiLy, addressDaiLy } = req.body

            const userLaiThu = await LaiThus.findOne({
                idUser: idUser
            })

            if (userLaiThu) {
                return res.status(400).json({ msg: "Mỗi tài khoản chỉ đăng ký 1 lần" })
            }

            sendEmailLaiThu(emailUser, nameCar, type, moneyCar, dates, times, nameUser, nameDaiLy, addressDaiLy)

            const saveLaiThu = new LaiThus({
                idUser, phone, nhanxung, Idcar, type, Iddaily, dates, times, checkedEmail
            })

            await saveLaiThu.save()

            res.json({ msg: "Register Succes! Please activate your email to start." })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getSuccessLaiThu: async (req, res) => {
        try {
            const { checked, LaiThuID } = req.body

            await LaiThus.findOneAndUpdate({
                _id: LaiThuID
            }, {
                checked
            })

            res.json({ msg: "Đơn hàng đã sửa thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    cronJob: async (req, res) => {
        try {
            const { duyet } = req.body
            await LaiThus.findOneAndUpdate({
                _id: req.params.id
            }, {
                duyet
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getCronJob: async (req, res) => {
        try {
            const date = moment(new Date()).format('DD/MM/YYYY')
            const res = await LaiThus.find({
                duyet: 1
            }).populate('idUser').populate('Idcar').populate('Iddaily')

            for (let i = 0; i < res.length; i++) {
                if (res[i].dates === date) {
                    if (res[i].checkGuiThongBao === 0) {
                        EmailHenLaiThu(res[i])
                        res[i].checkGuiThongBao = 1
                        await res[i].save()
                        console.log("đã gửi")
                    }
                    else {
                        console.log("gửi rồi")
                    }
                }
                else {
                    console.log("không bằng")
                }
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = LaiThuController