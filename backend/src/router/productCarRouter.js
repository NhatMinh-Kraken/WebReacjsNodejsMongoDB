const router = require('express').Router()
const productController = require('../controller/productController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/products')
    .get(productController.getProducts)
    .post(auth, authAdmin, productController.createProducts)

router.route('/nametype').get(productController.SelectNameType)

router.route('/products/:id')
    .delete(auth, authAdmin, productController.deleteProducts)
    .put(auth, authAdmin, productController.updateProducts)

router.route('/productsDelete/:id').put(auth, authAdmin, productController.updateProductWhenDelete)

router.route('/productsLoad').get(productController.getProductsLoad)

module.exports = router