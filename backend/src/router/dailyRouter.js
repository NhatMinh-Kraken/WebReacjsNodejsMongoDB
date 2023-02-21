const router = require('express').Router()
const Controller = require('../controller/dailyController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/daily').get(Controller.get).post(auth, authAdmin, Controller.create)
router.route('/daily/:id').delete(auth, authAdmin, Controller.deleted)
router.route('/dailyUpdate').post(auth, authAdmin, Controller.put)

router.route('/putForOne/:id').put(auth, authAdmin, Controller.putForOne)

// router.route('/categorysLimit').get(Controller.getCategoriesLimit)

module.exports = router