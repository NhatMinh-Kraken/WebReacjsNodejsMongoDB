const router = require('express').Router()
const LaiThuController = require('../controller/laithuController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/laithu').get(LaiThuController.getLaiThu).post(auth, LaiThuController.LaiThu).patch(auth, authAdmin, LaiThuController.getSuccessLaiThu)
router.route('/laithu/:id').patch(auth, authAdmin, LaiThuController.getSuccessLaiThu)

router.route('/cron/:id').put(auth, authAdmin, LaiThuController.cronJob)

router.route('/donlaithu-infor/:id').get(LaiThuController.getDonLaiThuInfor)


module.exports = router