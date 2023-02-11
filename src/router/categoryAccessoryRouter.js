const router = require('express').Router()
const categoryAccessoryController = require('../controller/categoryAccessoryController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/categoryAccessory').get(categoryAccessoryController.getCategories).post(auth, authAdmin, categoryAccessoryController.createCategory)
router.route('/categoryAccessory/:id').delete(auth, authAdmin, categoryAccessoryController.deleteCategory).put(auth, authAdmin, categoryAccessoryController.updateCategory)

module.exports = router