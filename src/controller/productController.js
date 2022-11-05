const db = require('../models/index')


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        console.log({ before: queryObj }) //before delete page
        const excludedFields = ['page', 'sorf', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        console.log({ after: queryObj }) //after delete page

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        console.log(queryStr)


        //gte = greater than or equal
        //lte = lesser than or equal
        //lt = lesser than
        //gt = greater than

        this.query.findAll(JSON.parse(queryStr))

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)

            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createAt')
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const productController = {
    getProducts: async (req, res) => {
        try {
            // const features = new APIfeatures(db.ProductCars.findAll(), req.query).filtering().sorting().paginating()
            // const productCar = await features.query

            // res.json({
            //     status: "success",
            //     result: productCar.length,
            //     productCar: productCar
            // })
            const productCar = await db.ProductCars.findAll()
            res.json(productCar)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProducts: async (req, res) => {
        try {
            const { product_car_id, name, type, money, colortypeone, colortypetwo, colortypethree, energy, avatar, description, checked, sold, amount } = req.body
            if (!avatar || !colortypeone || !colortypetwo || !colortypethree) {
                return res.status(400).json({ msg: "No Image Upload" })
            }
            const product = await db.ProductCars.findOne({
                where: {
                    id: product_car_id
                }
            })
            if (product) {
                return res.status(400).json({ msg: "This product already exists" })
            }

            const newProduct = new db.ProductCars({
                where: {
                    id: product_car_id
                }
            })

            if (newProduct) {
                newProduct.product_car_id = product_car_id, newProduct.name = name, newProduct.type = type, newProduct.money = money,
                    newProduct.colortypeone = colortypeone, newProduct.colortypetwo = colortypetwo, newProduct.colortypethree = colortypethree,
                    newProduct.energy = energy, newProduct.avatar = avatar, newProduct.description = description.toLowerCase(), newProduct.checked = checked,
                    newProduct.sold = sold, newProduct.amount = amount

                await newProduct.save()
            }

            res.json("Create Sussecc")

        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProducts: async (req, res) => {
        try {
            const product = await db.ProductCars.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!product) {
                res.json({
                    msg: "Not Product"
                })
            }
            await db.ProductCars.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json({ msg: "Deleted a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProducts: async (req, res) => {
        try {
            const { name, type, money, colortypeone, colortypetwo, colortypethree, energy, avatar, description, checked, sold, amount } = req.body
            if (!colortypeone || !colortypetwo || !colortypethree || !avatar) {
                return res.status(400).json({ msg: "No Image Upload" })
            }

            const newProduct = await db.ProductCars({
                where: {
                    id: req.params.id
                }
            })
            if (newProduct) {
                newProduct.name = name, newProduct.type = type, newProduct.money = money,
                    newProduct.colortypeone = colortypeone, newProduct.colortypetwo = colortypetwo, newProduct.colortypethree = colortypethree,
                    newProduct.energy = energy, newProduct.avatar = avatar, newProduct.description = description.toLowerCase(), newProduct.checked = checked,
                    newProduct.sold = sold, newProduct.amount = amount

                await newProduct.save()
            }
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    SelectNameType: async (req, res) => {
        try {
            const user = await db.ProductCars.findAll({
                include: [
                    {
                        model: db.Categorys, as: 'CategoryData'
                    }
                ],
                raw: false,
                nest: true,
            })
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = productController