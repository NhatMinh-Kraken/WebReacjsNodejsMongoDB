const router = require('express').Router()
const Controller = require('../controller/optionBaoDuongController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/get-optionbaoduong', Controller.get)
router.get('/getProductToType', Controller.getProductToType)

router.put('/put-optionbaoduong/:id', auth, Controller.edit)
router.delete('/delete-optionbaoduong/:id', auth, Controller.delete)
router.post('/update-optionbaoduong', auth, Controller.update)
router.post('/insert-optionbaoduong', auth, Controller.insert)

router.post('/post-editMultipleCheck', auth, Controller.editMultipleCheck)

module.exports = router