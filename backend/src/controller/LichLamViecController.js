const Data = require('../model/LichLamViec/lichlamviecModel')

const LichLamViecController = {
    get: async (req, res) => {
        try {
            const get = await Data.find().populate("idCoVan").populate("IdDonBaoDuong")
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
        try {
            const { title, start, end, idCoVan, IdDonBaoDuong } = req.body

            // const get = await Data.findOne({
            //     title
            // })

            // if (get) return res.status(400).json({ msg: "tiêu đề đã tồn tại" })

            const newData = new Data({
                title, start, end, idCoVan, IdDonBaoDuong
            })
            await newData.save()

            res.json('Create Sussecc')
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = LichLamViecController 