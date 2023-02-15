// const db = require('../models/index')
const Categorys = require('../model/categorysModel')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Categorys.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getCategoriesLimit: async (req, res) => {
        try {
            const categories = await Categorys.find().limit(3)
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createCategory: async (req, res) => {
        try {
            //if user info role === 0 ---> admin
            // only admin can reate, delete, edit category
            const { name } = req.body
            const category = await Categorys.findOne({
                name
            })

            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Categorys({
                name
            })
            await newCategory.save()

            res.json('Create Sussecc')
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = await Categorys.findOne({
                _id: req.params.id
            })

            if (!category) {
                res.json({
                    msg: "Not Category"
                })
            }

            await Categorys.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            await Categorys.findOneAndUpdate({
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

module.exports = categoryController