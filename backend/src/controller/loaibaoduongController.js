// const db = require('../models/index')
const Data = require('../model/BaoDuong/loaiDichVuModel')

const loaibaoduongController = {
    get: async (req, res) => {
        try {
            const categories = await Data.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
        try {
            //if user info role === 0 ---> admin
            // only admin can reate, delete, edit category
            const { name } = req.body
            const category = await Data.findOne({
                name
            })

            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Data({
                name
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
            const { name } = req.body
            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                name
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = loaibaoduongController