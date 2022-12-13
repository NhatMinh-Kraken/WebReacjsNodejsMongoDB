const router = require('express').Router()
// const addressController = require('../controller/addressController')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

router.post('/forgot', userController.forgotPassword)

router.post('/reset', auth, userController.resetPassword)

router.patch('/change_password', auth, userController.changePassword)

router.get('/infor', auth, userController.getUserInfor)

router.get('/all_infor', auth, authAdmin, userController.getUsersAllInfor)

router.get('/logout', userController.logout)

router.patch('/update', auth, userController.updateUser)

router.patch('/update_address', auth, userController.updateAddress)

router.patch('/update_role/:id', auth, authAdmin, userController.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userController.deleteUser)


// Social Login
router.post('/google_login', userController.googleLogin)
router.post('/facebook_login', userController.facebookLogin)

// Address

// router.post('/address_city', addressController.addressCity)
// router.post('/address_district', addressController.addressDistrict)


module.exports = router