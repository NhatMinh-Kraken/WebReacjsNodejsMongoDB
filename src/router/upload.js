const router = require('express').Router()
const uploadController = require('../controller/uploadController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')



router.post('/upload_avatar', auth, uploadController.uploadAvatar)
router.post('/upload_product_car', auth, authAdmin, uploadController.uploadProduct)
router.post('/destroy_product_car', auth, authAdmin, uploadController.destroyImage)
router.post('/destroy_avatar', auth, uploadController.destroyAvatar)

router.post('/uploadMul', auth, authAdmin, uploadController.uploadMul)
router.post('/detroy_all_image', auth, authAdmin, uploadController.destroyAllAvatar)

module.exports = router