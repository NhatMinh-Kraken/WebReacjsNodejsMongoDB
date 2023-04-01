const router = require('express').Router()
const Data = require('../controller/searchController')

router.get('/searchQuery', Data.searchQuery)
router.get('/TangDanQuery', Data.TangDanQuery)
router.get('/GiamDanQuery', Data.GiamDanQuery)
router.get('/searchDayMonthYear', Data.searchDayMonthYear)
module.exports = router