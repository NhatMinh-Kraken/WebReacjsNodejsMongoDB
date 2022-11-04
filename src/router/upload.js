const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadController = require('../controller/uploadController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')



router.post('/upload_avatar', auth, uploadController.uploadAvatar)
router.post('/upload_product_car', auth, authAdmin, uploadController.uploadProduct)
router.post('/destroy_product_car', auth, authAdmin, uploadController.destroyImage)
router.post('/destroy_avatar', auth, authAdmin, uploadController.destroyAvatar)

module.exports = router