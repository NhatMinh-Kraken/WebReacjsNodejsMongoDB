// const db = require('../models/index')
const LaiThus = require('../model/laithuModel')
const sendEmailLaiThu = require('./sendMailLaiThu')

const LaiThuController = {
    getLaiThu: async (req, res) => {
        try {
            const laithu = await LaiThus.find().populate('idUser')
            res.json(laithu)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    LaiThu: async (req, res) => {
        try {

            const { nameUser, email, idUser, name, type, money, smoney1, smoney2, smoney3, smoney4, smoney5, sum, date } = req.body

            const userLaiThu = await LaiThus.findOne({
                idUser: idUser
            })

            if (userLaiThu) {
                return res.status(400).json({ msg: "Mỗi tài khoản chỉ đăng ký 1 lần" })
            }

            sendEmailLaiThu(email, name, type, money, smoney1, smoney2, smoney3, smoney4, smoney5, sum, date, nameUser)

            const saveLaiThu = new LaiThus({
                idUser, name, type, money, smoney1, smoney2, smoney3, smoney4, smoney5, sum, date
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
            },{
                checked
            })

            res.json({ msg: "Đơn hàng đã sửa thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = LaiThuController