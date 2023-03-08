const router = require('express').Router()
const Controller = require('../controller/loaibaoduongController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/loaibaoduong').get(Controller.get).post(auth, authAdmin, Controller.create)
router.route('/loaibaoduong/:id').delete(auth, authAdmin, Controller.delete).put(auth, authAdmin, Controller.update)


module.exports = router