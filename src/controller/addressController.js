// const db = require('../models/index')

// const addressController = {
//     addressCity: async (req, res) => {
//         try {
//             const city = await db.Citys.findAll({
//                 raw: true
//             })
//             res.json(city)
//         } catch (err) {
//             return res.status(500).json({ msg: err.message })
//         }
//     },
//     addressDistrict: async (req, res) => {
//         try {
//             const district = await db.sequelize.query("SELECT * FROM `Citys`,`Districts` WHERE `Citys`.id = `Districts`.city_id;",{raw:true})
//             res.json(district)
//         } catch (err) {
//             return res.status(500).json({ msg: err.message })
//         }
//     }
// }

// module.exports = addressController