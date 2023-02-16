// const db = require('../models/index')
const CategoryAccessory = require('../model/categorysAccessoryModel')

const categoryAccessoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await CategoryAccessory.find()
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
            const category = await CategoryAccessory.findOne({
                name
            })

            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new CategoryAccessory({
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
            const category = await CategoryAccessory.findOne({
                _id: req.params.id
            })

            if (!category) {
                res.json({
                    msg: "Not Category"
                })
            }

            await CategoryAccessory.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            await CategoryAccessory.findOneAndUpdate({
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

module.exports = categoryAccessoryController