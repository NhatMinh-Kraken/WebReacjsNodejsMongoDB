const router = require('express').Router()
const Controller = require('../controller/chitietbaoduongController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/chitietbaoduong').get(Controller.get).post(auth, authAdmin, Controller.create)
router.route('/chitietbaoduong/:id').delete(auth, authAdmin, Controller.deleted)
router.route('/chitietbaoduongUpdate').post(auth, authAdmin, Controller.put)
router.route('/chitietbaoduong/:id').put(auth, authAdmin, Controller.update)

//router.route('/chitietbaoduong/:id').put(auth, authAdmin, Controller.putForOne)

// router.route('/categorysLimit').get(Controller.getCategoriesLimit)

module.exports = router