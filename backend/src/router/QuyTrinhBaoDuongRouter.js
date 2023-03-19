const router = require('express').Router()
const Controller = require('../controller/QuyTrinhBaoDuongController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/quytrinhbaoduong').get(Controller.get).post(auth, authAdmin, Controller.create)
router.route('/quytrinhbaoduong/:id').delete(auth, authAdmin, Controller.delete).put(auth, authAdmin, Controller.update)

router.route('/hoanthanh-optionB1/:id').put(auth, authAdmin, Controller.updateOption) // buoc 1

router.route('/hoanthanh-option-buoc1/:id').put(auth, authAdmin, Controller.updateOptionBuoc1) // buoc1

router.route('/hoanthanh-optionB2/:id').put(auth, authAdmin, Controller.updateOptionB2) // buoc 2

router.route('/hoanthanh-option-buoc2/:id').put(auth, authAdmin, Controller.updateOptionBuoc2) // buoc2

router.route('/hoanthanh-option-ve-buoc1/:id').put(auth, authAdmin, Controller.updateOptionVeBuoc1) // ve buoc 1

router.route('/hoanthanh-option-ve-buoc2/:id').put(auth, authAdmin, Controller.updateOptionVeBuoc2) // ve buoc 1

router.route('/gui-email-thongtin-khachhang-baoduong/:id').put(auth, authAdmin, Controller.updateGuiThongtinMailKhachHangBaoDuong) // gừi gamil, thông tin đơn bảo dưỡng cho khách hàng
router.route('/gui-email-thongtin-covan-baoduong/:id').put(auth, authAdmin, Controller.updateGuiThongtinMailCoVanBaoDuong) // gừi gamil, thông tin đơn bảo dưỡng cho cố vấn

module.exports = router