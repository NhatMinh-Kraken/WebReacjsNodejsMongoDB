const router = require('express').Router()
const Controller = require('../controller/LichLamViecController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/lichlamviec').get(Controller.get).post(auth, authAdmin, Controller.create)
// router.route('/lichlamviec/:id').delete(auth, authAdmin, Controller.delete).put(auth, authAdmin, Controller.update)


module.exports = router