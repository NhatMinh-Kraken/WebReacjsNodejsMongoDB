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
            const categories = await Categorys.find().limit(4)
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createCategory: async (req, res) => {
        try {
            //if user info role === 0 ---> admin
            // only admin can reate, delete, edit category
            const { name, ClickKeHoach } = req.body

            const category = await Categorys.findOne({
                name
            })

            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Categorys({
                name, ChiTietBaoDuong: ClickKeHoach
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
            const { name, ClickKeHoach } = req.body

            if (ClickKeHoach) {
                await Categorys.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    name, ChiTietBaoDuong: ClickKeHoach
                })
            }
            else {
                await Categorys.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    name
                })
            }


            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createDataWithExcel: async (req, res) => {
        try {
            const jokes = req.body

            const category = await Categorys.findOne({
                name: jokes.name
            })

            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Categorys({
                name: jokes.name, ChiTietBaoDuong: jokes.newJokes
            })
            await newCategory.save()

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateDataWithExcel: async (req, res) => {
        try {
            const jokes = req.body;

            const gf = await Categorys.findOneAndUpdate({
                _id: req.params.id
            }, {
                name: jokes.name
            })

            if (gf) {
                const promises = jokes.map(async (item) => {
                    const res = await Categorys.updateMany({ "ChiTietBaoDuong._id": item._id }, {
                        $set: { "ChiTietBaoDuong": { ...item } },
                    });

                    return res;
                });

                Promise.all(promises)
                    .then(() =>
                        res.json({ success: true, message: "Update success" })
                    )
                    .catch((err) => res.status(400).json(err));
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = categoryController