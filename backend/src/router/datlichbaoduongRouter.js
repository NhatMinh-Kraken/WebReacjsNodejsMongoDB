const router = require('express').Router()
const Controller = require('../controller/datlichbaoduongController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/get-datlichbaoduong', Controller.get)

router.put('/put-datlichbaoduong-hoanthanh/:id', auth, Controller.update)
router.put('/put-datlichbaoduong-duyet/:id', auth, Controller.updateDuyet)
router.delete('/delete-datlichbaoduong/:id', auth, Controller.delete)
router.post('/update-datlichbaoduong', Controller.create)

module.exports = router