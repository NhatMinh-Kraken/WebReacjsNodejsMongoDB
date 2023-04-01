const router = require('express').Router()
const Controller = require('../controller/datlichbaoduongController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/get-datlichbaoduong', Controller.get)
router.put('/put-datlichbaoduong-hoanthanh/:id', auth, Controller.update)
router.put('/put-datlichbaoduong-duyet/:id', auth, Controller.updateDuyet)
router.delete('/delete-datlichbaoduong/:id', auth, Controller.delete)
router.post('/update-datlichbaoduong', Controller.create)
router.put('/huy-datlichbaoduong/:id', auth, Controller.huyDon)
router.put('/cr-QuyTrinh/:id', auth, Controller.crQuyTrinh)
router.put('/Edit-optionbaoduong/:id', auth, Controller.editOptionBaoDuong)

router.get('/get-datlichbaoduong-covan', Controller.findNVCVLength)
router.get('/get-findKHDonBaoDuong', Controller.findKHDonBaoDuong)
router.get('/FilterToMonth', Controller.FilterToMonth)
router.get('/FilterToYear', Controller.FilterToYear)

module.exports = router