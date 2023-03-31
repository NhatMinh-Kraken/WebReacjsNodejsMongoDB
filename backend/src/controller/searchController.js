// const db = require('../models/index')
const Data = require('../model/BaoDuong/DatLichBaoDuongModel')

const searchController = {
    searchQuery: async (req, res) => {
        try {
            const resData = await Data.find().populate("IdLoaiXe").populate("Iddaily").populate("IdOptionBaoDuong").populate("IdUser").populate("IdCoVan")

            const { query } = req.query;
            const keys = ["BienSo"];

            const search = (data) => {
                return data.filter((item) =>
                    keys.some((key) => item[key].toLowerCase().includes(query))
                );
            };

            query ? res.json(search(resData).slice(0, 10)) : res.json(resData.slice(0, 10));
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    TangDanQuery: async (req, res) => {
        try {
            const get = await Data.find().sort({ Tong: 1 })
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    GiamDanQuery: async (req, res) => {
        try {
            const get = await Data.find().sort({ Tong: -1 })
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    searchDayMonthYear: async (req, res) => {
        try {
            const full = await Data.find()

            const { day, month, year } = req.query;
            let query = {};

            if (day) {
                query = { $gte: new Date(`${year}-${month}-${day}`), $lt: new Date(`${year}-${month}-${parseInt(day) + 1}`) };
            } else if (month) {
                const lastDayOfMonth = new Date(year, parseInt(month), 0).getDate();
                query = { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${month}-${lastDayOfMonth}`) };
            } else if (year) {
                query = { $gte: new Date(`${year}-01-01`), $lt: new Date(`${parseInt(year) + 1}-01-01`) };
            }

            const data = await Data.find({
                dayMonthYear: query
            });

            if (data.length !== 0) {
                res.json(data)
            }
            else {
                res.json(full)
            }

            // day !== "" || month !== "Tháng" || year !== "" ? res.json(data) : res.json(full);
            // res.json(data);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = searchController