const ProductCars = require('../model/productCarModel')
const Categorys = require('../model/categorysModel')

const cloudinary = require('cloudinary')
const fs = require('fs')
const { file } = require('googleapis/build/src/apis/file')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    cloud_api: process.env.CLOUD_API
})


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query
        //console.log({ before: queryObj }) //before delete page
        const excludedFields = ['page', 'sorf', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        //console.log({ after: queryObj }) //after delete page

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //console.log(queryStr)


        //gte = greater than or equal
        //lte = lesser than or equal
        //lt = lesser than
        //gt = greater than

        this.query.find(JSON.parse(queryStr))

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

    getProductsLoad: async (req, res) => {
        try {
            const features = new APIfeatures(ProductCars.find().populate("type"), req.query).filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getProducts: async (req, res) => {
        try {
            const productCar = await ProductCars.find()
            res.json(productCar)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createProducts: async (req, res) => {
        try {
            let avatar = [...req.body.avatar]
            let imageBuffer = []

            for (let i = 0; i < avatar.length; i++) {
                const result = await cloudinary.v2.uploader.upload(avatar[i], {
                    folder: "imageProduct"
                })

                imageBuffer.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }

            req.body.avatar = imageBuffer

            const { name, type, money, energy, description, descriptionHTML, specifications, specificationsHTML, descriptionInterior, descriptionInteriorHTML, descriptionConvenient, descriptionConvenientHTML, checked, checkThinhHanh, amount, laithu, tudong } = req.body


            if (!name || !type || !money || !energy || !description || !specifications || !descriptionInterior || !descriptionConvenient || !amount) {
                return res.status(400).json({ msg: "Please complete all information" })
            }

            const product = await ProductCars.findOne({
                name
            })
            if (product) {
                return res.status(400).json({ msg: "This product already exists" })
            }

            const newProduct = new ProductCars({
                name
            })

            if (newProduct) {
                newProduct.name = name, newProduct.type = type, newProduct.money = money,
                    newProduct.energy = energy, newProduct.avatar = req.body.avatar, newProduct.description = description, newProduct.descriptionHTML = descriptionHTML, newProduct.specifications = specifications, newProduct.specificationsHTML = specificationsHTML, newProduct.descriptionInterior = descriptionInterior, newProduct.descriptionInteriorHTML = descriptionInteriorHTML, newProduct.descriptionConvenient = descriptionConvenient, newProduct.descriptionConvenientHTML = descriptionConvenientHTML, newProduct.checked = checked, newProduct.checkThinhHanh = checkThinhHanh
                newProduct.amount = amount, newProduct.laithu = laithu, newProduct.tudong = tudong

                await newProduct.save()
                await Categorys.findByIdAndUpdate({
                    _id: type
                }, {
                    checkThinhHanh
                })
            }


            // console.log(newProduct)

            res.json("Create Sussecc")

        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProducts: async (req, res) => {
        try {
            const product = await ProductCars.findOne({
                _id: req.params.id
            })
            if (!product) {
                res.json({
                    msg: "Not Product"
                })
            }

            await ProductCars.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProductWhenDelete: async (req, res) => {
        try {
            const { name, type, money, energy, description, descriptionHTML, specifications, specificationsHTML, descriptionInterior, descriptionInteriorHTML, descriptionConvenient, descriptionConvenientHTML, checked, checkThinhHanh, amount, laithu, tudong } = req.body


            // if (!name || !type || !money || !energy || !description || !specifications || !descriptionInterior || !descriptionConvenient || !amount) {
            //     return res.status(400).json({ msg: "Please complete all information" })
            // }

            // if (!name || !type || !money || !energy || !description || !specifications || !amount) {
            //     return res.status(400).json({ msg: "Please complete all information" })
            // }

            const newProduct = await ProductCars.findOne({
                _id: req.params.id
            })
            if (newProduct) {
                newProduct.name = name, newProduct.type = type, newProduct.money = money,
                    newProduct.energy = energy, newProduct.avatar = req.body.avatar, newProduct.description = description, newProduct.descriptionHTML = descriptionHTML, newProduct.specifications = specifications, newProduct.specificationsHTML = specificationsHTML, newProduct.descriptionInterior = descriptionInterior, newProduct.descriptionInteriorHTML = descriptionInteriorHTML, newProduct.descriptionConvenient = descriptionConvenient, newProduct.descriptionConvenientHTML = descriptionConvenientHTML, newProduct.checked = checked, newProduct.checkThinhHanh = checkThinhHanh
                newProduct.amount = amount, newProduct.laithu = laithu, newProduct.tudong = tudong

                await newProduct.save()
            }
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateProducts: async (req, res) => {
        try {
            let avatar = [...req.body.avatar]
            let imageBuffer = []

            for (let i = 0; i < avatar.length; i++) {
                const result = await cloudinary.v2.uploader.upload(avatar[i], {
                    folder: "imageProduct"
                })

                imageBuffer.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }

            req.body.avatar = imageBuffer

            //console.log(req.body.avatar)

            const { name, type, money, energy, description, descriptionHTML, specifications, specificationsHTML, descriptionInterior, descriptionInteriorHTML, descriptionConvenient, descriptionConvenientHTML, checked, checkThinhHanh, amount, laithu, tudong } = req.body

            await ProductCars.findOneAndUpdate({
                _id: req.params.id
            }, {
                name: name, type: type, money: money,
                $push: { avatar: [...req.body.avatar] },
                energy: energy, description: description, descriptionHTML: descriptionHTML, specifications: specifications, specificationsHTML: specificationsHTML,
                descriptionInterior: descriptionInterior, descriptionInteriorHTML: descriptionInteriorHTML,
                descriptionConvenient: descriptionConvenient, descriptionConvenientHTML: descriptionConvenientHTML, checked: checked, checkThinhHanh: checkThinhHanh,
                amount: amount, laithu: laithu, tudong: tudong
            })

            await Categorys.findOneAndUpdate({
                _id: type
            }, {
                checkThinhHanh
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    SelectNameType: async (req, res) => {
        try {
            const user = await ProductCars.find().populate('type')
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = productController