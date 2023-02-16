const router = require('express').Router()
const categoryController = require ('../controller/categoryController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/categorys').get(categoryController.getCategories).post(auth,authAdmin,categoryController.createCategory)
router.route('/categorys/:id').delete(auth,authAdmin,categoryController.deleteCategory).put(auth,authAdmin,categoryController.updateCategory)

router.route('/categorysLimit').get(categoryController.getCategoriesLimit)

module.exports = router