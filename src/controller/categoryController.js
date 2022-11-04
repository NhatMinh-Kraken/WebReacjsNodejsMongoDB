const db = require('../models/index')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await db.Categorys.findAll()
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
            const category = await db.Categorys.findOne({
                where: {
                    name: name
                },
            })

            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new db.Categorys({
                where: {
                    name: name
                }
            })
            if (newCategory) {
                newCategory.name = name
                await newCategory.save()
            }

            res.json('Create Sussecc')
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = await db.Categorys.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!category) {
                res.json({
                    msg: "Not Category"
                })
            }

            await db.Categorys.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            const category = await db.Categorys.findOne({
                where: {
                    id: req.params.id
                },
                raw: false
            })
            if (category) {
                category.name = name
                await category.save()
            }
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = categoryController